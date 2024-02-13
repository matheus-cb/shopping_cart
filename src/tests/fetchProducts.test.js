import { fetchProduct, fetchProductsList } from '../helpers/fetchFunctions';
import './mocks/fetchSimulator';

describe('Testa a função fetchProduct', () => {
  it('Testa se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('Executa a função fetchProduct com um id de produto válido', async () => {
    const product = await fetchProduct('MLB1405519561');
    await fetchProduct('MLB1405519561');
    expect(fetch).toBeCalled();
  });

  it('Executa a função fetchProduct sem um id de produto', async () => {
    await expect(fetchProduct()).rejects.toThrow('ID não informado');
  });

});

describe('Testa a função fetchProductsList', () => {
  it('Testa se fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('Executa a função fetchProductsList com um termo de busca válido', async () => {
    const productsList = await fetchProductsList('computador');
    expect(fetch).toBeCalled();
  });

  it('Executa a função fetchProductsList sem um termo de busca', async () => {
    await expect(fetchProductsList()).rejects.toThrow('Termo de busca não informado');
  });

});