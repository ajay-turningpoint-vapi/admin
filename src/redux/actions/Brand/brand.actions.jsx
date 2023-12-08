import { addBrand, deleteBrand, getBrand, updateBrand } from "../../../services/brand.service";

export const BRAND_ADD = "BRAND_ADD";
export const BRAND_ADD_SUCCESS = "BRAND_ADD_SUCCESS";
export const BRAND_ADD_FAIL = "BRAND_ADD_FAIL";

export const GET_ALL_BRANDS = "GET_ALL_BRANDS";
export const GET_ALL_BRANDS_SUCCESS = "GET_ALL_BRANDS_SUCCESS";
export const GET_ALL_BRANDS_FAIL = "GET_ALL_BRANDS_FAIL";

export const UPDATE_BRAND_BY_ID = "UPDATE_BRAND_BY_ID";
export const UPDATE_BRAND_BY_ID_SUCCESS = "UPDATE_BRAND_BY_ID_SUCCESS";
export const UPDATE_BRAND_BY_ID_FAIL = "UPDATE_BRAND_BY_ID_FAIL";

export const SET_BRAND_OBJ = "SET_BRAND_OBJ";
export const SET_BRAND_OBJ_SUCCESS = "SET_BRAND_OBJ_SUCCESS";
export const SET_BRAND_OBJ_FAIL = "SET_BRAND_OBJ_FAIL";

export const GET_BRAND_BY_ID = "GET_BRAND_BY_ID";
export const GET_BRAND_BY_ID_SUCCESS = "GET_BRAND_BY_ID_SUCCESS";
export const GET_BRAND_BY_ID_FAIL = "GET_BRAND_BY_ID_FAIL";

export const DELETE_BRAND_BY_ID = "DELETE_BRAND_BY_ID";
export const DELETE_BRAND_BY_ID_SUCCESS = "DELETE_BRAND_BY_ID_SUCCESS";
export const DELETE_BRAND_BY_ID_FAIL = "DELETE_BRAND_BY_ID_FAIL";

export const BrandAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: BRAND_ADD });
    let { data: response } = await addBrand(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: BRAND_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: BRAND_ADD_FAIL, payload: err });
  }
};

export const BrandGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BRANDS });
    let { data: response } = await getBrand(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: GET_ALL_BRANDS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: BRAND_ADD_FAIL, payload: err });
  }
};

export const SetBrandObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_BRAND_OBJ });
    if (formData) {
      dispatch({
        type: SET_BRAND_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_BRAND_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_BRAND_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const BrandUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BRAND_BY_ID });
    let { data: response } = await updateBrand(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_BRAND_BY_ID_SUCCESS,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_BRAND_BY_ID_FAIL, payload: err });
  }
};

export const BrandDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BRAND_BY_ID });
    let { data: response } = await deleteBrand(id);
    if (response) {
      console.log(response);
      dispatch({
        type: DELETE_BRAND_BY_ID_SUCCESS,
      });
      dispatch(BrandGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_BRAND_BY_ID_FAIL, payload: err });
  }
};
