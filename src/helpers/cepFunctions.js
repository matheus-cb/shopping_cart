// Função para validar o formato do CEP (apenas como exemplo, adapte conforme sua necessidade)
const isValidCEP = (cep) => /^\d{8}$/.test(cep);

export const getAddress = async (cep) => {
  if (!isValidCEP(cep)) {
    return 'CEP inválido';
  }

  try {
    const promise1 = (await fetch(`https://cep.awesomeapi.com.br/json/${cep}`)).json();
    const promise2 = (await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`)).json();

    const result = await Promise.any([promise1, promise2]);
    const { address, district, city, state } = result;

    return {
      logradouro: address,
      bairro: district,
      cidade: city,
      estado: state,
    };
  } catch (error) {
    console.error(error);
    return { error: 'CEP não encontrado' };
  }
};

export const searchCep = async () => {
  try {
    // Capturar o valor do CEP fornecido pelo usuário a partir da interface do usuário
    const cepInput = document.querySelector('.cep-input');
    const cep = cepInput.value.trim();

    // Verificar se o CEP fornecido é válido (pode incluir validações adicionais)
    if (!isValidCEP(cep)) {
      throw new Error('CEP inválido');
    }

    // Chamar a função getAddress para obter os detalhes do endereço
    const addressData = await getAddress(cep);

    const addressElement = document.querySelector('.cart__address');

    // Verificar se a consulta de CEP foi bem-sucedida
    if (addressData.error) {
      // Exibir mensagem de erro na interface do usuário
      addressElement.innerText = addressData.error;
    } else {
      // Atualizar a interface do usuário com os detalhes do endereço
      const { logradouro, bairro, cidade, estado } = addressData;
      const endereco = `${logradouro} - ${bairro} - ${cidade} - ${estado}`;
      addressElement.innerText = endereco;
    }
  } catch (error) {
    // Tratar outros erros, se necessário, e exibi-los na interface do usuário
    const addressElement = document.querySelector('.cart__address');
    addressElement.innerText = error.message;
  }
};
