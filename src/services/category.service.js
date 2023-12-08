import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/category";

export const addCategory = (formData) => {
  return axios.post(serverUrl + "/addCategory", formData);
};

export const getCategory = (query) => {
  return axios.get(`${serverUrl}/getCategory?${query}`);
};

export const deleteCategory = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateCategory = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};

export const getNestedCategories = () => {
  return axios.get(`${serverUrl}/getNestedCategories`);
};
