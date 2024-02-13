import { fetchProduct } from './fetchFunctions';

/**
 * Função que retorna todos os itens do carrinho salvos no localStorage.
 * @returns {Array} Itens de ids salvos do carrinho ou array vazio.
 */
export const getSavedCartIDs = () => {
  const cartProducts = localStorage.getItem('cartProducts');
  return cartProducts ? JSON.parse(cartProducts) : [];
};

/**
 * Função para atualizar o subtotal
 */
export const updateSubtotal = async () => {
  const totalElement = document.querySelector('.total-price');
  const cartProducts = getSavedCartIDs();
  let total = 0;

  // Use Promise.all para aguardar todas as chamadas à API
  await Promise.all(cartProducts.map(async (productId) => {
    const product = await fetchProduct(productId);
    total += product.price;
  }));

  totalElement.innerText = total.toFixed(2);
};

/**
 * Função que adiciona um product ao carrinho.
 * @param {string} id - ID do product a ser adicionado.
 */
export const saveCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const updatedCart = [...cartProducts, id];
  localStorage.setItem('cartProducts', JSON.stringify(updatedCart));

  // Atualize o subtotal após a adição do produto
  updateSubtotal();
};

/**
 * Função que remove um product do carrinho.
 * @param {string} id - ID do product a ser removido.
 */
export const removeCartID = (id) => {
  if (!id) throw new Error('Você deve fornecer um ID');

  const cartProducts = getSavedCartIDs();
  const indexToRemove = cartProducts.indexOf(id);

  const numOne = 1;

  if (indexToRemove !== -numOne) {
    // Verifique se há mais de um item desse produto no carrinho
    const count = cartProducts.filter((productId) => productId === id).length;

    if (count > 1) {
      // Reduza a quantidade em vez de remover completamente
      cartProducts.splice(indexToRemove, 1);
    } else {
      // Remova completamente se houver apenas um
      cartProducts.splice(indexToRemove, 1);
    }

    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));

    // Atualize o subtotal após a remoção do produto
    updateSubtotal();
  }
};
