import axios, { AxiosError } from 'axios';
import { supabase } from '../lib/supabase';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export default apiClient;
