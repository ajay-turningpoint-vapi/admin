import { addContest, deleteContest, getContest, updateContest } from "../../../services/contest.service";

export const CONTEST_ADD = "CONTEST_ADD";
export const CONTEST_ADD_SUCCESS = "CONTEST_ADD_SUCCESS";
export const CONTEST_ADD_FAIL = "CONTEST_ADD_FAIL";

export const GET_ALL_CONTESTS = "GET_ALL_CONTESTS";
export const GET_ALL_CONTESTS_SUCCESS = "GET_ALL_CONTESTS_SUCCESS";
export const GET_ALL_CONTESTS_FAIL = "GET_ALL_CONTESTS_FAIL";

export const UPDATE_CONTEST_BY_ID = "UPDATE_CONTEST_BY_ID";
export const UPDATE_CONTEST_BY_ID_SUCCESS = "UPDATE_CONTEST_BY_ID_SUCCESS";
export const UPDATE_CONTEST_BY_ID_FAIL = "UPDATE_CONTEST_BY_ID_FAIL";

export const SET_CONTEST_OBJ = "SET_CONTEST_OBJ";
export const SET_CONTEST_OBJ_SUCCESS = "SET_CONTEST_OBJ_SUCCESS";
export const SET_CONTEST_OBJ_FAIL = "SET_CONTEST_OBJ_FAIL";

export const GET_CONTEST_BY_ID = "GET_CONTEST_BY_ID";
export const GET_CONTEST_BY_ID_SUCCESS = "GET_CONTEST_BY_ID_SUCCESS";
export const GET_CONTEST_BY_ID_FAIL = "GET_CONTEST_BY_ID_FAIL";

export const DELETE_CONTEST_BY_ID = "DELETE_CONTEST_BY_ID";
export const DELETE_CONTEST_BY_ID_SUCCESS = "DELETE_CONTEST_BY_ID_SUCCESS";
export const DELETE_CONTEST_BY_ID_FAIL = "DELETE_CONTEST_BY_ID_FAIL";

export const CONTESTAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CONTEST_ADD });
    let { data: response } = await addContest(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: CONTEST_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: CONTEST_ADD_FAIL, payload: err });
  }
};

export const CONTESTGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CONTESTS });
    let { data: response } = await getContest(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: GET_ALL_CONTESTS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: CONTEST_ADD_FAIL, payload: err });
  }
};

export const SetCONTESTObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_CONTEST_OBJ });
    if (formData) {
      dispatch({
        type: SET_CONTEST_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_CONTEST_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_CONTEST_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const CONTESTUpdate = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CONTEST_BY_ID });
    let { data: response } = await updateContest(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_CONTEST_BY_ID_SUCCESS,
        payload: { data: null, message: response.message }
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_CONTEST_BY_ID_FAIL, payload: err });
  }
};

export const CONTESTDelete = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CONTEST_BY_ID });
    let { data: response } = await deleteContest(id);
    if (response) {
      console.log(response);
      dispatch({
        type: DELETE_CONTEST_BY_ID_SUCCESS,
        payload: { data: null, message: response.message },
      });
      CONTESTGet();
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_CONTEST_BY_ID_FAIL, payload: err });
  }
};
