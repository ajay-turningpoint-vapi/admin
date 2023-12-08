import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/banner";

export const addBanner = (formData) => {
  return axios.post(serverUrl + "/addBanner", formData);
};

export const getBanner = (query) => {
  return axios.get(`${serverUrl}/getBanner?${query}`);
};

export const deleteBanner = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateBanner = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
