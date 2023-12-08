import { addProduct, deleteProductById, getProducts, updateProductById } from "../../../services/product.service";

export const PRODUCT_ADD = "PRODUCT_ADD";
export const PRODUCT_ADD_SUCCESS = "PRODUCT_ADD_SUCCESS";
export const PRODUCT_ADD_FAIL = "PRODUCT_ADD_FAIL";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_PRODUCTS_SUCCESS = "GET_ALL_PRODUCTS_SUCCESS";
export const GET_ALL_PRODUCTS_FAIL = "GET_ALL_PRODUCTS_FAIL";

export const UPDATE_PRODUCT_BY_ID = "UPDATE_PRODUCT_BY_ID";
export const UPDATE_PRODUCT_BY_ID_SUCCESS = "UPDATE_PRODUCT_BY_ID_SUCCESS";
export const UPDATE_PRODUCT_BY_ID_FAIL = "UPDATE_PRODUCT_BY_ID_FAIL";

export const SET_PRODUCT_OBJ = "SET_PRODUCT_OBJ";
export const SET_PRODUCT_OBJ_SUCCESS = "SET_PRODUCT_OBJ_SUCCESS";
export const SET_PRODUCT_OBJ_FAIL = "SET_PRODUCT_OBJ_FAIL";

export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS";
export const GET_PRODUCT_BY_ID_FAIL = "GET_PRODUCT_BY_ID_FAIL";

export const DELETE_PRODUCT_BY_ID = "DELETE_PRODUCT_BY_ID";
export const DELETE_PRODUCT_BY_ID_SUCCESS = "DELETE_PRODUCT_BY_ID_SUCCESS";
export const DELETE_PRODUCT_BY_ID_FAIL = "DELETE_PRODUCT_BY_ID_FAIL";

// export const GET_ALL_NESTED_CATEGORIES = "GET_ALL_NESTED_CATEGORIES";
// export const GET_ALL_NESTED_CATEGORIES_SUCCESS = "GET_ALL_NESTED_CATEGORIES_SUCCESS";
// export const GET_ALL_NESTED_CATEGORIES_FAIL = "GET_ALL_NESTED_CATEGORIES_FAIL";

export const PRODUCTAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ADD });
    let { data: response } = await addProduct(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: PRODUCT_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: PRODUCT_ADD_FAIL, payload: err });
  }
};

export const PRODUCTGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCTS });
    let { data: response } = await getProducts(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: PRODUCT_ADD_FAIL, payload: err });
  }
};

export const SetPRODUCTObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_PRODUCT_OBJ });
    if (formData) {
      dispatch({
        type: SET_PRODUCT_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_PRODUCT_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_PRODUCT_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const PRODUCTUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_BY_ID });
    let { data: response } = await updateProductById(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_PRODUCT_BY_ID_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_PRODUCT_BY_ID_FAIL, payload: err });
  }
};

export const PRODUCTDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_BY_ID });
    let { data: response } = await deleteProductById(id);
    if (response) {
      console.log(response);
      dispatch({
        type: DELETE_PRODUCT_BY_ID_SUCCESS,
        payload: { message: response.message },
      });
      dispatch(PRODUCTGet);
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_PRODUCT_BY_ID_FAIL, payload: err });
  }
};
