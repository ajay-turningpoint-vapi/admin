import { addCoupon, deleteCouponById, getCoupons, updateCouponById ,addMultpleCoupons } from "../../../services/Coupons.service";

export const COUPON_ADD = "COUPON_ADD";
export const COUPON_MULTIPLE_ADD = "COUPON_MULTIPLE_ADD";
export const COUPON_MULTIPLE_ADD_SUCCESS = "COUPON_MULTIPLE_ADD_SUCCESS";
export const COUPON_ADD_SUCCESS = "COUPON_ADD_SUCCESS";
export const COUPON_ADD_FAIL = "COUPON_ADD_FAIL";

export const GET_ALL_COUPONS = "GET_ALL_COUPONS";
export const GET_ALL_COUPONS_SUCCESS = "GET_ALL_COUPONS_SUCCESS";
export const GET_ALL_COUPONS_FAIL = "GET_ALL_COUPONS_FAIL";

export const UPDATE_COUPON_BY_ID = "UPDATE_COUPON_BY_ID";
export const UPDATE_COUPON_BY_ID_SUCCESS = "UPDATE_COUPON_BY_ID_SUCCESS";
export const UPDATE_COUPON_BY_ID_FAIL = "UPDATE_COUPON_BY_ID_FAIL";

export const SET_COUPON_OBJ = "SET_COUPON_OBJ";
export const SET_COUPON_OBJ_SUCCESS = "SET_COUPON_OBJ_SUCCESS";
export const SET_COUPON_OBJ_FAIL = "SET_COUPON_OBJ_FAIL";

export const GET_COUPON_BY_ID = "GET_COUPON_BY_ID";
export const GET_COUPON_BY_ID_SUCCESS = "GET_COUPON_BY_ID_SUCCESS";
export const GET_COUPON_BY_ID_FAIL = "GET_COUPON_BY_ID_FAIL";

export const DELETE_COUPON_BY_ID = "DELETE_COUPON_BY_ID";
export const DELETE_COUPON_BY_ID_SUCCESS = "DELETE_COUPON_BY_ID_SUCCESS";
export const DELETE_COUPON_BY_ID_FAIL = "DELETE_COUPON_BY_ID_FAIL";

export const COUPONAdd = (formData) => async (dispatch) => {
    try {
        dispatch({ type: COUPON_ADD });
        let { data: response } = await addCoupon(formData);
        if (response) {
            console.log(response);
            dispatch({
                type: COUPON_ADD_SUCCESS,
                payload: response.message,
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: COUPON_ADD_FAIL, payload: err });
    }
};

export const CouponMultipleAdd = (formData) => async (dispatch) => {
    try {
        console.log(formData,"respose");
        dispatch({ type: COUPON_MULTIPLE_ADD });
        let { data: response } = await addMultpleCoupons(formData);
        if (response) {
            console.log(response,"respose");
            dispatch({
                type: COUPON_MULTIPLE_ADD_SUCCESS,
                payload: { data: response.data, message: response.message },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: COUPON_ADD_FAIL, payload: err });
    }
};

export const COUPONGet = (formData) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_COUPONS });
        let { data: response } = await getCoupons(formData);
        if (response) {
            console.log(response);
            dispatch({
                type: GET_ALL_COUPONS_SUCCESS,
                payload: { data: response.data, message: response.message },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: COUPON_ADD_FAIL, payload: err });
    }
};

export const SetCOUPONObj = (formData) => async (dispatch) => {
    try {
        dispatch({ type: SET_COUPON_OBJ });
        if (formData) {
            dispatch({
                type: SET_COUPON_OBJ_SUCCESS,
                payload: { data: formData },
            });
        } else {
            dispatch({
                type: SET_COUPON_OBJ_SUCCESS,
                payload: { data: null },
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: SET_COUPON_OBJ_FAIL, payload: { message: "NOT FOUND" } });
    }
};

export const COUPONUpdate = (formData, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_COUPON_BY_ID });
        let { data: response } = await updateCouponById(formData, id);
        if (response) {
            console.log(response);
            dispatch({
                type: UPDATE_COUPON_BY_ID_SUCCESS,
            });
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: UPDATE_COUPON_BY_ID_FAIL, payload: err });
    }
};

export const COUPONDelete = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_COUPON_BY_ID });
        let { data: response } = await deleteCouponById(id);
        if (response) {
            console.log(response);
            dispatch({
                type: DELETE_COUPON_BY_ID_SUCCESS,
            });
            COUPONGet();
        }
    } catch (err) {
        console.error(err);
        dispatch({ type: DELETE_COUPON_BY_ID_FAIL, payload: err });
    }
};
