import axios from "axios";

export const cepFetcher = async (cep) => {
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return data;
  } catch (err) {
    return err;
  }
};
