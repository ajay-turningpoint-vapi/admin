import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/contest";

export const addContest = (formData) => {
  return axios.post(serverUrl + "/addContest", formData);
};

export const getContest = (query) => {
  return axios.get(`${serverUrl}/getContestAdmin?${query}`);
};

export const deleteContest = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateContest = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
