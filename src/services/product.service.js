import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/product";

export const addProduct = (formData) => {
  return axios.post(serverUrl + "/addProduct", formData);
};

export const getProducts = (query) => {
  return axios.get(`${serverUrl}/getProducts?${query}`);
};

export const deleteProductById = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateProductById = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
