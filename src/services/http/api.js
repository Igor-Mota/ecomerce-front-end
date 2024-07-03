import axios from 'axios';
import { QueryClient } from "react-query";
import { environment } from '@/data/environment';


const api = axios.create({
    baseURL: environment.API_URL
});

api.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

const queryClient = new QueryClient()

export { api, queryClient };
