export const fetchProduct = async (id) => {
  if (!id) {
    throw new Error('ID não informado');
  }

  const result = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const product = await result.json();
  return product;
};

export const fetchProductsList = async (keyword) => {
  if (!keyword) {
    throw new Error('Termo de busca não informado');
  }

  const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${keyword}`);
  const obj = await result.json();
  const arr = obj.results;
  return arr;
};
