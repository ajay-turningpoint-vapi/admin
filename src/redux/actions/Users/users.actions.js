import {
  addUser,
  deleteUser,
  getById,
  getSpecificCustomer,
  getUser,
  updateUser,
  getUserPointHistory,
  getUserContestsApi,
  getUserActivityLog,
} from "../../../services/users.service";

export const USER_GET = "USER_GET";
export const USER_GET_SUCCESS = "USER_GET_SUCCESS";
export const USER_GET_FAIL = "USER_GET_FAIL";

export const USER_ADD = "USER_ADD";
export const USER_ADD_SUCCESS = "USER_ADD_SUCCESS";
export const USER_ADD_FAIL = "USER_ADD_FAIL";

export const USER_UPDATE = "USER_UPDATE";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_FAIL = "USER_UPDATE_FAIL";

export const USER_DELETE = "USER_DELETE";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_FAIL = "USER_DELETE_FAIL";

export const GET_SPECIFIC_CUSTOMER = "GET_SPECIFIC_CUSTOMER";
export const GET_SPECIFIC_CUSTOMER_SUCCESS = "GET_SPECIFIC_CUSTOMER_SUCCESS";
export const GET_SPECIFIC_CUSTOMER_FAIL = "GET_SPECIFIC_CUSTOMER_FAIL";

export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_USER_BY_ID_SUCCESS = "GET_USER_BY_ID_SUCCESS";
export const GET_USER_BY_ID_FAIL = "GET_USER_BY_ID_FAIL";

export const USER_POINT_HISTORY_GET = "USER_POINT_HISTORY_GET";
export const USER_POINT_HISTORY_GET_SUCCESS = "USER_POINT_HISTORY_GET_SUCCESS";
export const USER_POINT_HISTORY_GET_FAIL = "USER_POINT_HISTORY_GET_FAIL";
export const GET_USER_ACTIVITY_LOG_BY_ID = "GET_USER_ACTIVITY_LOG_BY_ID";
export const USER_ACTIVITY_LOG_GET_SUCCESS = "USER_ACTIVITY_LOG_GET_SUCCESS";
export const USER_ACTIVITY_LOG_GET_FAIL = "USER_ACTIVITY_LOG_GET_FAIL";

export const USER_CONTEST_GET = "USER_CONTEST_GET";
export const USER_CONTEST_GET_SUCCESS = "USER_CONTEST_GET_SUCCESS";
export const USER_CONTEST_GET_FAIL = "USER_CONTEST_GET_FAIL";

export const GET_USER_POINT_HISTORY_BY_ID = "GET_USER_POINT_HISTORY_BY_ID";

export const userAdd = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_ADD });
    let { data: response } = await addUser(formData);
    if (response) {
      dispatch({
        type: USER_ADD_SUCCESS,
        payload: { users: [], message: response.message },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: USER_ADD_FAIL, payload: error });
  }
};

export const usersGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_GET });
    let { data: response } = await getUser(formData);
    console.log(response);
    if (response) {
      dispatch({
        type: USER_GET_SUCCESS,
        payload: { users: response.data, message: response.message },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: USER_GET_FAIL, payload: error });
  }
};
export const userActivityLog = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ACTIVITY_LOG_BY_ID });
    let response = await getUserActivityLog(`?userId=${userId}&limit=10`);
    console.log(response);
    if (response) {
      dispatch({
        type: USER_ACTIVITY_LOG_GET_SUCCESS,
        payload: {
          userAcityLogs: response.data.userActivityLogs,
          message: response.message,
        },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: USER_ACTIVITY_LOG_GET_FAIL, payload: error });
  }
};

export const userPointHistory = (userId) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_POINT_HISTORY_BY_ID });
    let { data: response } = await getUserPointHistory(
      `?userId=${userId}&limit=10`
    );
    console.log(response);
    if (response) {
      dispatch({
        type: USER_POINT_HISTORY_GET_SUCCESS,
        payload: { pointHistories: response.data, message: response.message },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: USER_POINT_HISTORY_GET_FAIL, payload: error });
  }
};

export const userDelete = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE });
    let { data: response } = await deleteUser(formData);
    if (response) {
      dispatch({
        type: USER_DELETE_SUCCESS,
        payload: { users: response.data, message: response.message },
      });
      // dispatch(usersGet("role="));
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: USER_DELETE_FAIL, payload: error });
  }
};

export const getSpecificUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_SPECIFIC_CUSTOMER });
    let { data: response } = await getSpecificCustomer(formData);
    if (response) {
      dispatch({
        type: GET_SPECIFIC_CUSTOMER_SUCCESS,
        payload: { userObj: response.data, message: response.message },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_SPECIFIC_CUSTOMER_FAIL, payload: error });
  }
};

export const getUserById = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_BY_ID });
    let { data: response } = await getById(formData);
    if (response) {
      dispatch({
        type: GET_USER_BY_ID_SUCCESS,
        payload: { userObj: response.data, message: response.message },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: GET_USER_BY_ID_FAIL, payload: error });
  }
};

export const updateSpecificUser = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE });
    let { data: response } = await updateUser(formData, id);
    if (response) {
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: { users: response.data, message: response.message },
      });
      // dispatch(usersGet('role='))
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserContests = (formData) => async (dispatch) => {
  try {
    dispatch({ type: USER_CONTEST_GET });
    let { data: response } = await getUserContestsApi(formData);
    console.log("res", response);
    if (response) {
      dispatch({
        type: USER_CONTEST_GET_SUCCESS,
        payload: {
          data: response.data,
          message: response.message,
          count: response.totalCount,
          totalPages: response.totalPages,
        },
      });
    }
  } catch (error) {
    console.error(error);
    dispatch({ type: USER_CONTEST_GET_FAIL, payload: error });
  }
};
