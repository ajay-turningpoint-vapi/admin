import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/tax";

export const addTax = (formData) => {
  return axios.post(serverUrl + "/addTax", formData);
};

export const getTax = (query) => {
  return axios.get(`${serverUrl}/getTax?${query}`);
};

export const deleteTax = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateTax = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
