import { addTax, deleteTax, getTax, updateTax } from "../../../services/tax.service";

export const TAX_ADD = "TAX_ADD";
export const TAX_ADD_SUCCESS = "TAX_ADD_SUCCESS";
export const TAX_ADD_FAIL = "TAX_ADD_FAIL";

export const GET_ALL_TAXS = "GET_ALL_TAXS";
export const GET_ALL_TAXS_SUCCESS = "GET_ALL_TAXS_SUCCESS";
export const GET_ALL_TAXS_FAIL = "GET_ALL_TAXS_FAIL";

export const UPDATE_TAX_BY_ID = "UPDATE_TAX_BY_ID";
export const UPDATE_TAX_BY_ID_SUCCESS = "UPDATE_TAX_BY_ID_SUCCESS";
export const UPDATE_TAX_BY_ID_FAIL = "UPDATE_TAX_BY_ID_FAIL";

export const SET_TAX_OBJ = "SET_TAX_OBJ";
export const SET_TAX_OBJ_SUCCESS = "SET_TAX_OBJ_SUCCESS";
export const SET_TAX_OBJ_FAIL = "SET_TAX_OBJ_FAIL";

export const GET_TAX_BY_ID = "GET_TAX_BY_ID";
export const GET_TAX_BY_ID_SUCCESS = "GET_TAX_BY_ID_SUCCESS";
export const GET_TAX_BY_ID_FAIL = "GET_TAX_BY_ID_FAIL";

export const DELETE_TAX_BY_ID = "DELETE_TAX_BY_ID";
export const DELETE_TAX_BY_ID_SUCCESS = "DELETE_TAX_BY_ID_SUCCESS";
export const DELETE_TAX_BY_ID_FAIL = "DELETE_TAX_BY_ID_FAIL";

export const TAXAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: TAX_ADD });
    let { data: response } = await addTax(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: TAX_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: TAX_ADD_FAIL, payload: err });
  }
};

export const TAXGet = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TAXS });
    let { data: response } = await getTax();
    if (response) {
      console.log(response);
      dispatch({
        type: GET_ALL_TAXS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: TAX_ADD_FAIL, payload: err });
  }
};

export const SetTAXObj = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    dispatch({ type: SET_TAX_OBJ });
    if (formData) {
      dispatch({
        type: SET_TAX_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_TAX_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_TAX_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const TAXUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TAX_BY_ID });
    let { data: response } = await updateTax(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_TAX_BY_ID_SUCCESS,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_TAX_BY_ID_FAIL, payload: err });
  }
};

export const TAXDelete = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TAX_BY_ID });
    let { data: response } = await deleteTax(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: DELETE_TAX_BY_ID_SUCCESS,
      });
      TAXGet();
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_TAX_BY_ID_FAIL, payload: err });
  }
};
