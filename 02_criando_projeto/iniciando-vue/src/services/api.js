import axios from "axios";

const auth = btoa(import.meta.env.VITE_APP_KEY_API_TOTVS);

const headers = {
  Accept: "*/*",
  Authorization: `Basic ${auth}`,
  tenantid: "01,01SEDE0001",
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: "https://companhiade177829.protheus.cloudtotvs.com.br:4050", //import.meta.VITE_APP_API_BASE_URL,
  timeout: 5000,
  headers: headers,
});

api.interceptors.request.use((config) => {
  console.log(`Request to: ${config.url}`);
  return config;
});

export default api;
