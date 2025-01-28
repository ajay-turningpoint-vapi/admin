import axios from "axios";
import { url } from "./url.service";

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: url, // Set your base URL here
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
