import { addCategory, deleteCategory, getCategory, getNestedCategories, updateCategory } from "../../../services/category.service";

export const CATEGORY_ADD = "CATEGORY_ADD";
export const CATEGORY_ADD_SUCCESS = "CATEGORY_ADD_SUCCESS";
export const CATEGORY_ADD_FAIL = "CATEGORY_ADD_FAIL";

export const GET_ALL_CATEGORYS = "GET_ALL_CATEGORYS";
export const GET_ALL_CATEGORYS_SUCCESS = "GET_ALL_CATEGORYS_SUCCESS";
export const GET_ALL_CATEGORYS_FAIL = "GET_ALL_CATEGORYS_FAIL";

export const UPDATE_CATEGORY_BY_ID = "UPDATE_CATEGORY_BY_ID";
export const UPDATE_CATEGORY_BY_ID_SUCCESS = "UPDATE_CATEGORY_BY_ID_SUCCESS";
export const UPDATE_CATEGORY_BY_ID_FAIL = "UPDATE_CATEGORY_BY_ID_FAIL";

export const SET_CATEGORY_OBJ = "SET_CATEGORY_OBJ";
export const SET_CATEGORY_OBJ_SUCCESS = "SET_CATEGORY_OBJ_SUCCESS";
export const SET_CATEGORY_OBJ_FAIL = "SET_CATEGORY_OBJ_FAIL";

export const GET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID";
export const GET_CATEGORY_BY_ID_SUCCESS = "GET_CATEGORY_BY_ID_SUCCESS";
export const GET_CATEGORY_BY_ID_FAIL = "GET_CATEGORY_BY_ID_FAIL";

export const DELETE_CATEGORY_BY_ID = "DELETE_CATEGORY_BY_ID";
export const DELETE_CATEGORY_BY_ID_SUCCESS = "DELETE_CATEGORY_BY_ID_SUCCESS";
export const DELETE_CATEGORY_BY_ID_FAIL = "DELETE_CATEGORY_BY_ID_FAIL";

// export const GET_ALL_NESTED_CATEGORIES = "GET_ALL_NESTED_CATEGORIES";
// export const GET_ALL_NESTED_CATEGORIES_SUCCESS = "GET_ALL_NESTED_CATEGORIES_SUCCESS";
// export const GET_ALL_NESTED_CATEGORIES_FAIL = "GET_ALL_NESTED_CATEGORIES_FAIL";

export const CATEGORYAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_ADD });
    let { data: response } = await addCategory(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: CATEGORY_ADD_SUCCESS,
        payload: response.message,
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: CATEGORY_ADD_FAIL, payload: err });
  }
};

export const CATEGORYGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORYS });
    let { data: response } = await getCategory(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: GET_ALL_CATEGORYS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: CATEGORY_ADD_FAIL, payload: err });
  }
};

export const SetCATEGORYObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_CATEGORY_OBJ });
    if (formData) {
      dispatch({
        type: SET_CATEGORY_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_CATEGORY_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_CATEGORY_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const CATEGORYUpdate = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_BY_ID });
    let { data: response } = await updateCategory(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_CATEGORY_BY_ID_SUCCESS,
        payload: response.message,
      });
      dispatch(CATEGORYGet());
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_CATEGORY_BY_ID_FAIL, payload: err });
  }
};

export const CATEGORYDelete = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_BY_ID });
    let { data: response } = await deleteCategory(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: DELETE_CATEGORY_BY_ID_SUCCESS,
      });
      CATEGORYGet();
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: DELETE_CATEGORY_BY_ID_FAIL, payload: err });
  }
};

export const getAllNestedCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CATEGORYS });
    let { data: response } = await getNestedCategories();
    if (response) {
      dispatch({
        type: GET_ALL_CATEGORYS_SUCCESS,
        payload: { data: response.data },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_ALL_CATEGORYS_FAIL, payload: error });
  }
};
