import axios from 'axios';
import { VITE_API_BASE_URL } from '../../env.ts';

const api = axios.create({
    baseURL: VITE_API_BASE_URL,
});

api.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error),
);

export default api;
