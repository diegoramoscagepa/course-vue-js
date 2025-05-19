import axios from 'axios';

const api = axios.create({
  baseURL: 'https://companhiade177829.protheus.cloudtotvs.com.br:4050',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    //'Authorization': 'Bearer ' + localStorage.getItem('token')
  }
});


api.interceptors.request.use(config => {
  console.log(`Request to: ${config.url}`);
  return config
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
