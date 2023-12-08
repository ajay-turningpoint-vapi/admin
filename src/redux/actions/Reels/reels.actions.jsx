import { addReels, deleteReelsById, getReels, updateReelsById } from "../../../services/reels.service";

export const REELS_ADD = "REELS_ADD";
export const REELS_ADD_SUCCESS = "REELS_ADD_SUCCESS";
export const REELS_ADD_FAIL = "REELS_ADD_FAIL";

export const GET_ALL_REELS = "GET_ALL_REELS";
export const GET_ALL_REELS_SUCCESS = "GET_ALL_REELS_SUCCESS";
export const GET_ALL_REELS_FAIL = "GET_ALL_REELS_FAIL";

export const UPDATE_REELS_BY_ID = "UPDATE_REELS_BY_ID";
export const UPDATE_REELS_BY_ID_SUCCESS = "UPDATE_REELS_BY_ID_SUCCESS";
export const UPDATE_REELS_BY_ID_FAIL = "UPDATE_REELS_BY_ID_FAIL";

export const SET_REELS_OBJ = "SET_REELS_OBJ";
export const SET_REELS_OBJ_SUCCESS = "SET_REELS_OBJ_SUCCESS";
export const SET_REELS_OBJ_FAIL = "SET_REELS_OBJ_FAIL";

export const GET_REELS_BY_ID = "GET_REELS_BY_ID";
export const GET_REELS_BY_ID_SUCCESS = "GET_REELS_BY_ID_SUCCESS";
export const GET_REELS_BY_ID_FAIL = "GET_REELS_BY_ID_FAIL";

export const DELETE_REELS_BY_ID = "DELETE_REELS_BY_ID";
export const DELETE_REELS_BY_ID_SUCCESS = "DELETE_REELS_BY_ID_SUCCESS";
export const DELETE_REELS_BY_ID_FAIL = "DELETE_REELS_BY_ID_FAIL";

export const ReelsAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REELS_ADD });
    let { data: response } = await addReels(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: REELS_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: REELS_ADD_FAIL, payload: err });
  }
};

export const ReelsGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_REELS });
    let { data: response } = await getReels(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: GET_ALL_REELS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: REELS_ADD_FAIL, payload: err });
  }
};

export const SetReelsObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_REELS_OBJ });
    if (formData) {
      dispatch({
        type: SET_REELS_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_REELS_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_REELS_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const ReelsUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REELS_BY_ID });
    let { data: response } = await updateReelsById(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_REELS_BY_ID_SUCCESS,
        payload: response
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_REELS_BY_ID_FAIL, payload: err });
  }
};

export const ReelsDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REELS_BY_ID });
    let { data: response } = await deleteReelsById(id);
    if (response) {
      console.log(response);
      dispatch({
        type: DELETE_REELS_BY_ID_SUCCESS,
      });
      dispatch(ReelsGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_REELS_BY_ID_FAIL, payload: err });
  }
};
