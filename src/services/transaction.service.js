import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/points";

export const getTransaction = (query) => {
  return axios.get(`${serverUrl}/points-history?${query}`);
};

export const updateTransactionStatus = (formData, id) => {
  return axios.patch(`${serverUrl}/update-pointstatus/${id}`, formData);
};

export const getTransactionCount = (query) => {
  return axios.get(`${serverUrl}/points-history-count`);
};
