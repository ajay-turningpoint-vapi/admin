import axios from 'axios';
import { url } from './url.service';

const API = `${url}/jobs`;

export const createJob = (data) => axios.post(API, data);
export const updateJob = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteJob = (id) => axios.delete(`${API}/${id}`);
export const pauseJob = (id) => axios.patch(`${API}/${id}/pause`);
export const resumeJob = (id) => axios.patch(`${API}/${id}/resume`);
export const getJobsByPromotionId = (id) => axios.get(`${API}/promotion/${id}`);