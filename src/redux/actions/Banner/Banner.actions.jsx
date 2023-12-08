import { addBanner, deleteBanner, getBanner, updateBanner } from "../../../services/banner.service";

export const BANNER_ADD = "BANNER_ADD";
export const BANNER_ADD_SUCCESS = "BANNER_ADD_SUCCESS";
export const BANNER_ADD_FAIL = "BANNER_ADD_FAIL";

export const GET_ALL_BANNERS = "GET_ALL_BANNERS";
export const GET_ALL_BANNERS_SUCCESS = "GET_ALL_BANNERS_SUCCESS";
export const GET_ALL_BANNERS_FAIL = "GET_ALL_BANNERS_FAIL";

export const UPDATE_BANNER_BY_ID = "UPDATE_BANNER_BY_ID";
export const UPDATE_BANNER_BY_ID_SUCCESS = "UPDATE_BANNER_BY_ID_SUCCESS";
export const UPDATE_BANNER_BY_ID_FAIL = "UPDATE_BANNER_BY_ID_FAIL";

export const SET_BANNER_OBJ = "SET_BANNER_OBJ";
export const SET_BANNER_OBJ_SUCCESS = "SET_BANNER_OBJ_SUCCESS";
export const SET_BANNER_OBJ_FAIL = "SET_BANNER_OBJ_FAIL";

export const GET_BANNER_BY_ID = "GET_BANNER_BY_ID";
export const GET_BANNER_BY_ID_SUCCESS = "GET_BANNER_BY_ID_SUCCESS";
export const GET_BANNER_BY_ID_FAIL = "GET_BANNER_BY_ID_FAIL";

export const DELETE_BANNER_BY_ID = "DELETE_BANNER_BY_ID";
export const DELETE_BANNER_BY_ID_SUCCESS = "DELETE_BANNER_BY_ID_SUCCESS";
export const DELETE_BANNER_BY_ID_FAIL = "DELETE_BANNER_BY_ID_FAIL";

export const BANNERAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: BANNER_ADD });
    let { data: response } = await addBanner(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: BANNER_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: BANNER_ADD_FAIL, payload: err });
  }
};

export const BANNERGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BANNERS });
    let { data: response } = await getBanner(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: GET_ALL_BANNERS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: BANNER_ADD_FAIL, payload: err });
  }
};

export const SetBANNERObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_BANNER_OBJ });
    if (formData) {
      dispatch({
        type: SET_BANNER_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_BANNER_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_BANNER_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const BANNERUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BANNER_BY_ID });
    let { data: response } = await updateBanner(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_BANNER_BY_ID_SUCCESS,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_BANNER_BY_ID_FAIL, payload: err });
  }
};

export const BANNERDelete = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BANNER_BY_ID });
    let { data: response } = await deleteBanner(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: DELETE_BANNER_BY_ID_SUCCESS,
      });
      BANNERGet();
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_BANNER_BY_ID_FAIL, payload: err });
  }
};
