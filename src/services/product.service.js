import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/product";
const redeemableProductsUrl = url + "/redeemableProduct";

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

export const getProductsCount = (query) => {
  return axios.get(`${serverUrl}/getProductsCount`);
};



export const getReedemableProducts = (query) => {
  return axios.get(`${redeemableProductsUrl}/admin?${query}`);
}

export const addReedemableProduct = (formData) => {
  return axios.post(redeemableProductsUrl + "/add", formData);
};

export const deleteReedemableProductById = (id) => {  
  return axios.delete(`${redeemableProductsUrl}/${id}`);
};
 
export const updateReedemableProductById = (formData, id) => {      
  return axios.put(`${redeemableProductsUrl}/${id}`, formData);
};