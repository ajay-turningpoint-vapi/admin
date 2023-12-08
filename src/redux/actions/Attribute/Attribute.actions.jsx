import { addAttributValue, getAttributeValue, deleteAttributeValue, updateAttributeValue, addAttribute, getAttribute, deleteAttribute } from "../../../services/Attribute.service";

export const ATTRIBUTE_VALUE_ADD = "ATTRIBUTE_VALUE_ADD";
export const ATTRIBUTE_VALUE_ADD_SUCCESS = "ATTRIBUTE_VALUE_ADD_SUCCESS";
export const ATTRIBUTE_VALUE_ADD_FAIL = "ATTRIBUTE_VALUE_ADD_FAIL";

export const GET_ALL_ATTRIBUTE_VALUES = "GET_ALL_ATTRIBUTE_VALUES";
export const GET_ALL_ATTRIBUTE_VALUES_SUCCESS = "GET_ALL_ATTRIBUTE_VALUES_SUCCESS";
export const GET_ALL_ATTRIBUTE_VALUES_FAIL = "GET_ALL_ATTRIBUTE_VALUES_FAIL";

export const UPDATE_ATTRIBUTE_VALUE_BY_ID = "UPDATE_ATTRIBUTE_VALUE_BY_ID";
export const UPDATE_ATTRIBUTE_VALUE_BY_ID_SUCCESS = "UPDATE_ATTRIBUTE_VALUE_BY_ID_SUCCESS";
export const UPDATE_ATTRIBUTE_VALUE_BY_ID_FAIL = "UPDATE_ATTRIBUTE_VALUE_BY_ID_FAIL";

export const SET_ATTRIBUTE_VALUE_OBJ = "SET_ATTRIBUTE_VALUE_OBJ";
export const SET_ATTRIBUTE_VALUE_OBJ_SUCCESS = "SET_ATTRIBUTE_VALUE_OBJ_SUCCESS";
export const SET_ATTRIBUTE_VALUE_OBJ_FAIL = "SET_ATTRIBUTE_VALUE_OBJ_FAIL";

export const GET_ATTRIBUTE_VALUE_BY_ID = "GET_ATTRIBUTE_VALUE_BY_ID";
export const GET_ATTRIBUTE_VALUE_BY_ID_SUCCESS = "GET_ATTRIBUTE_VALUE_BY_ID_SUCCESS";
export const GET_ATTRIBUTE_VALUE_BY_ID_FAIL = "GET_ATTRIBUTE_VALUE_BY_ID_FAIL";

export const DELETE_ATTRIBUTE_VALUE_BY_ID = "DELETE_ATTRIBUTE_VALUE_BY_ID";
export const DELETE_ATTRIBUTE_VALUE_BY_ID_SUCCESS = "DELETE_ATTRIBUTE_VALUE_BY_ID_SUCCESS";
export const DELETE_ATTRIBUTE_VALUE_BY_ID_FAIL = "DELETE_ATTRIBUTE_VALUE_BY_ID_FAIL";

export const ATTRIBUTE_ADD = "ATTRIBUTE_ADD";
export const ATTRIBUTE_ADD_SUCCESS = "ATTRIBUTE_ADD_SUCCESS";
export const ATTRIBUTE_ADD_FAIL = "ATTRIBUTE_ADD_FAIL";

export const GET_ALL_ATTRIBUTE = "GET_ALL_ATTRIBUTE";
export const GET_ALL_ATTRIBUTE_SUCCESS = "GET_ALL_ATTRIBUTE_SUCCESS";
export const GET_ALL_ATTRIBUTE_FAIL = "GET_ALL_ATTRIBUTE_FAIL";

export const UPDATE_ATTRIBUTE_BY_ID = "UPDATE_ATTRIBUTE_VALUE_BY_ID";
export const UPDATE_ATTRIBUTE_BY_ID_SUCCESS = "UPDATE_ATTRIBUTE_VALUE_BY_ID_SUCCESS";
export const UPDATE_ATTRIBUTE_BY_ID_FAIL = "UPDATE_ATTRIBUTE_VALUE_BY_ID_FAIL";

export const SET_ATTRIBUTE_OBJ = "SET_ATTRIBUTE_OBJ";
export const SET_ATTRIBUTE_OBJ_SUCCESS = "SET_ATTRIBUTE_OBJ_SUCCESS";
export const SET_ATTRIBUTE_OBJ_FAIL = "SET_ATTRIBUTE_OBJ_FAIL";

export const GET_ATTRIBUTE_BY_ID = "GET_ATTRIBUTE_BY_ID";
export const GET_ATTRIBUTE_BY_ID_SUCCESS = "GET_ATTRIBUTE_BY_ID_SUCCESS";
export const GET_ATTRIBUTE_BY_ID_FAIL = "GET_ATTRIBUTE_BY_ID_FAIL";

export const DELETE_ATTRIBUTE_BY_ID = "DELETE_ATTRIBUTE_BY_ID";
export const DELETE_ATTRIBUTE_BY_ID_SUCCESS = "DELETE_ATTRIBUTE_BY_ID_SUCCESS";
export const DELETE_ATTRIBUTE_BY_ID_FAIL = "DELETE_ATTRIBUTE_BY_ID_FAIL";

export const ATTRIBUTE_VALUE_Add = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ATTRIBUTE_VALUE_ADD });
    let { data: response } = await addAttributValue(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: ATTRIBUTE_VALUE_ADD_SUCCESS,
        payload: response.message,
      });
      dispatch(ATTRIBUTE_VALUE_Get());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ATTRIBUTE_VALUE_ADD_FAIL, payload: err });
  }
};

export const ATTRIBUTE_VALUE_Get = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ATTRIBUTE_VALUES });
    let { data: response } = await getAttributeValue(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: GET_ALL_ATTRIBUTE_VALUES_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ATTRIBUTE_VALUE_ADD_FAIL, payload: err });
  }
};

export const SetATTRIBUTE_VALUEObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_ATTRIBUTE_VALUE_OBJ });
    if (formData) {
      dispatch({
        type: SET_ATTRIBUTE_VALUE_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_ATTRIBUTE_VALUE_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_ATTRIBUTE_VALUE_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const ATTRIBUTE_VALUEUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ATTRIBUTE_VALUE_BY_ID });
    let { data: response } = await updateAttributeValue(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_ATTRIBUTE_VALUE_BY_ID_SUCCESS,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_ATTRIBUTE_VALUE_BY_ID_FAIL, payload: err });
  }
};

export const ATTRIBUTE_VALUEDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ATTRIBUTE_VALUE_BY_ID });
    let { data: response } = await deleteAttributeValue(id);
    if (response) {
      console.log(response);
      dispatch({
        type: DELETE_ATTRIBUTE_VALUE_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(ATTRIBUTE_VALUE_Get());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_ATTRIBUTE_VALUE_BY_ID_FAIL, payload: err });
  }
};

export const ATTRIBUTEAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ATTRIBUTE_ADD });
    let { data: response } = await addAttribute(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: ATTRIBUTE_ADD_SUCCESS,
        payload: response.message,
      });
      dispatch(ATTRIBUTEGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ATTRIBUTE_ADD_FAIL, payload: err });
  }
};

export const ATTRIBUTEGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ATTRIBUTE });
    let { data: response } = await getAttribute(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: GET_ALL_ATTRIBUTE_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: ATTRIBUTE_ADD_FAIL, payload: err });
  }
};

export const ATTRIBUTEDelete = (formData) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ATTRIBUTE_BY_ID });
    let { data: response } = await deleteAttribute(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: DELETE_ATTRIBUTE_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(ATTRIBUTEGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_ATTRIBUTE_BY_ID_FAIL, payload: err });
  }
};
