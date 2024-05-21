import axios from 'axios';

const backendAPI = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

export const baseURL = `${backendAPI}/api`;

export const baseProdutosURL = `${baseURL}/produtos`;
export const baseEstoquesURL = `${baseURL}/estoques`;
export const baseRegistrosURL = `${baseURL}/registros`;

const axiosInstance = axios.create();

export default axiosInstance;
