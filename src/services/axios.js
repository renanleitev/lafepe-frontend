import axios from 'axios';

export const baseURL = 'http://localhost:8080/api';

export const baseProdutosURL = `${baseURL}/produtos`;
export const baseEstoquesURL = `${baseURL}/estoques`;
export const baseRegistrosURL = `${baseURL}/registros`;

const axiosInstance = axios.create();

export default axiosInstance;
