import axios from "axios";
import { url } from "./url.service";

const serverUrl = url + "/coupon";

export const addCoupon = (formData) => {
    return axios.post(serverUrl + "/addCoupon", formData);
};

export const addMultpleCoupons = (formData) => {
    console.log(formData)
    return axios.post(serverUrl + "/addMultipleCoupons", formData);
};

export const getCoupons = (query) => {
    return axios.get(`${serverUrl}/getCoupons?${query}`);
};


export const downloadCouponsLink = () => {
    return axios.get(`${serverUrl}/getActiveCouponsQrZip`);
};

export const deleteCouponById = (id) => {
    alert("asdsa")
    return axios.delete(`${serverUrl}/deleteById/${id}`);
};

export const updateCouponById = (formData, id) => {
    return axios.patch(`${serverUrl}/updateById/${id}`, formData);
};
