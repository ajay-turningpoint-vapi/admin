import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/brand";

export const addBrand = (formData) => {
  return axios.post(serverUrl + "/registerBrand", formData);
};

export const getBrand = (query) => {
  return axios.get(`${serverUrl}/getBrand?${query}`);
};

export const deleteBrand = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateBrand = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
