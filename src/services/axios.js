import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

export const baseProdutosURL = '/produtos';
export const baseEstoquesURL = '/estoques';
export const baseRegistrosURL = '/registros';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
