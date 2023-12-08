import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/users";
const serverPointUrl = url + "/points";

export const login = (formData) => {
  return axios.post(serverUrl + "/loginAdmin", formData);
};

export const addUser = (formData) => {
  return axios.post(serverUrl + "/registerOtherUsers", formData);
};

export const getUser = (query) => {
  return axios.get(`${serverUrl}/getUsers${query}`);
};


export const getUserStatsReport = (id) => {
  return axios.get(`${serverUrl}/getUserStatsReport/${id}`);
};

export const updateUserStatus = (id, formData) => {
  return axios.patch(`${serverUrl}/updateUserStatus/${id}`, formData);
};

export const updateUserKycStatus = (id, formData) => {
  return axios.patch(`${serverUrl}/updateUserKycStatus/${id}`, formData);
};

export const deleteUser = (id) => {
  return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const getSpecificCustomer = (value) => {
  return axios.get(`${serverUrl}/getSpecificCustomer?search=${value}`);
};

export const getById = (id) => {
  return axios.get(`${serverUrl}/getUserById/${id}`);
};

export const updateUser = (formData, id) => {
  return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};


export const getUserPointHistory = (query) => {
  return axios.get(`${serverPointUrl}/points-history${query}`);
};


export const updatePointHistoryStatus = (formData, id) => {
  return axios.patch(`${serverUrl}//update-pointstatus/${id}`, formData);
};

export const getUserContestsApi = (query) => {
  return axios.get(`${serverUrl}/getUserContests?${query}`);
};