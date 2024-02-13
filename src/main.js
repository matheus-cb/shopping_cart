import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { getSavedCartIDs, saveCartID, updateSubtotal } from './helpers/cartFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// cria mensagem de carregando
const loadProducts = () => {
  const sectionMain = document.querySelector('.products');
  const messageLoad = document.createElement('h1');
  messageLoad.className = 'loading';
  messageLoad.innerText = 'carregando...';
  sectionMain.appendChild(messageLoad);
};

// remove mensagem de carregando
const loaded = () => {
  const divC = document.querySelector('.loading');
  divC.remove();
};

// chama as funções loadProfucts e loaded, e também mostra os produtos na tela
const displayProducts = async (searchTerm) => {
  // seleciona o local que será o pai da lista dos produtos
  const sectionProducts = document.querySelector('.products');
  sectionProducts.innerHTML = ''; // Isso limpará todos os elementos filhos da lista de produtos.
  loadProducts();
  try {
    // cria uma variável que contem uma lista de objetos
    const listObj = await fetchProductsList(searchTerm);

    // para cada elemento da lista de obj cria uma section com descrições, img e preço do produto ...
    listObj.forEach((element) => {
      sectionProducts.appendChild(createProductElement(element));
    });
  } catch (error) {
    const sectionMain = document.querySelector('.products');
    const menssageError = document.createElement('h1');
    menssageError.className = 'error';
    menssageError.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    sectionMain.appendChild(menssageError);
  }
  loaded();
};

// Função para lidar com a busca
const handleSearch = async () => {
  const searchInput = document.querySelector('.search-input');
  const searchTerm = searchInput.value.trim(); // Obtém o texto de busca e remove espaços em branco extras

  if (searchTerm !== '') {
    // Chame displayProducts com o termo de busca
    await displayProducts(searchTerm);
  }
};

// Adicione um ouvinte de evento de clique ao botão de busca
const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', handleSearch);

// seleciona local para os produtos
const selectSpaceCart = (product) => {
  const li = createCartProductElement(product);
  const cart = document.querySelector('.cart__products');
  return cart.appendChild(li);
};

// adiciona os produtos ao carrinho de compras e ao localStorage
const addProducts = async () => {
  const productsContainer = document.querySelector('.products');

  productsContainer.addEventListener('click', async (event) => {
    if (event.target.classList.contains('product__add')) {
      // Esta parte é acionada quando um botão de adicionar é clicado

      // Obtenha o ID do produto
      const productId = event.target
        .parentElement.querySelector('.product__id').innerText;

      // Salve o ID do produto no localStorage
      saveCartID(productId);

      // Obtenha as informações do produto e adicione ao carrinho
      const product = await fetchProduct(productId);
      selectSpaceCart(product);
    }
  });
};

// adiciona o produto do local storage para o carrinho
const addProductsToLS = () => {
  // cria um array com os produtros do localStorage
  const arrayProducts = getSavedCartIDs();
  // console.log(arrayProducts);
  arrayProducts.map(async (element) => {
    // capitura as infos dos produtros
    const productToArray = await fetchProduct(element);
    // selectSpaceCart() p/ mostrar aonde vai ficar o local dos produtos
    selectSpaceCart(productToArray);
  });
  updateSubtotal();
};

window.onload = async () => {
  await displayProducts('computador');
  await addProducts();
  addProductsToLS();
};
