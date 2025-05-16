import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VUE_APP_API_BASE_URL,
  timeout: 10000,
});

// Interceptor para logs em desenvolvimento
/*
api.interceptors.request.use(config => {
  if (import.meta.env.VUE_APP_API_BASE_URL.NODE_ENV === 'development') {
    console.log(`Request to: ${config.url}`);
  }
  return config;
});
*/

export default api;
