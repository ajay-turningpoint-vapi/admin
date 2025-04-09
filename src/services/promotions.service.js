import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/promotions";

export const sendPromotion = (formData) => {
  return axios.post(serverUrl + "/send", formData);
};

export const getPromotions = () => {
  return axios.get(`${serverUrl}/`);
};

export const addPromotion = (formData) => {
  return axios.post(serverUrl + "/", formData);
};

export const deletePromotionById = (id) => {
  return axios.delete(`${serverUrl}/${id}`);
};

export const updatePromotionById = (id, formData) => {
  return axios.put(`${serverUrl}/${id}`, formData);
};

export const getPromotionById = (id) => {
  return axios.get(`${serverUrl}/${id}`);
};
