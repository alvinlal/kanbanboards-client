import axios from 'axios';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const axiosClient = axios.create({ baseURL: API_ENDPOINT });

export default axiosClient;
