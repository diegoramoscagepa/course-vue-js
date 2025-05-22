import axios from "axios";

const auth = btoa(import.meta.env.VITE_APP_KEY_API_TOTVS);

const headers = {
  Accept: "*/*",
  Authorization: `Basic ${auth}`,
  tenantid: "01,01SEDE0001",
  "Content-Type": "application/json",
};

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: headers,
  params: { cCodIntegracao: import.meta.env.VITE_COD_PARM_INTEG_TOTOVS }
});

api.interceptors.request.use((config) => {
  console.log(`Request to: ${config.url}`);
  return config;
});

export default api;
