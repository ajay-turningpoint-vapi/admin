import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/reels";

export const addReels = (formData) => {
    return axios.post(serverUrl + "/", formData);
};

export const getReels = (query) => {
    return axios.get(`${serverUrl}/getReels?${query}`);
};

export const deleteReelsById = (id) => {
    return axios.delete(`${serverUrl}/deleteById/${id}`);
};
export const deleteMultipleReels = (obj) => {
    return axios.patch(`${serverUrl}/deleteMultipleReels/`, obj);
};

export const updateReelsById = (formData, id) => {
    return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
