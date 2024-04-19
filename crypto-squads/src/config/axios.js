import axios from "axios";

const useApiAxios = axios.create({
  baseURL: "https://api.coincap.io/v2/",
  withCredentials: false,
});

useApiAxios.interceptors.request.use(
  (config) => {
    //console.debug('Making request to', config.url, 'with data', config.data);
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    //console.error('Request error', error);
    return Promise.reject(error);
  }
);

useApiAxios.interceptors.response.use(
  (response) => {
    //console.debug('Response from', response.config.url, 'with data', response.data);
    return response;
  },
  (error) => {
    //console.error('Response error', error);
    return Promise.reject(error);
  }
);

export default useApiAxios;