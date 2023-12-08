import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/attribute";

export const addAttributValue = (formData) => {
  return axios.post(serverUrl + "/addAttributValue", formData);
};

export const getAttributeValue = (query) => {
  return axios.get(`${serverUrl}/getAttributeValue?${query}`);
};

export const deleteAttributeValue = (id) => {
  return axios.delete(`${serverUrl}/deleteAttributeValueById/${id}`);
};

export const updateAttributeValue = (formData, id) => {
  return axios.patch(`${serverUrl}/updateAttributeValueById/${id}`, formData);
};

export const addAttribute = (formData) => {
  return axios.post(serverUrl + "/addAttribute", formData);
};

export const getAttribute = (query) => {
  return axios.get(`${serverUrl}/getAttribute?${query}`);
};

export const deleteAttribute = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateAttribute = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
