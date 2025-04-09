import { login, userRefreshToken } from "../../../services/users.service";
import jwtDecode from "jwt-decode";
export const AUTH = "AUTH";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const LOGOUT = "LOGOUT";
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAIL = "REFRESH_TOKEN_FAIL ";

export const loginUser = (formData) => async (dispatch) => {
  try {
    dispatch({ type: AUTH });
    let { data: response } = await login(formData);
    console.log("login resp",response);
    
    if (response) {
      let decodedToken = await jwtDecode(response.token);
      localStorage.setItem("token", response.token);
      // localStorage.setItem("refreshToken", response.refreshToken);
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          ...response.data,
          token: response.token,
          role: decodedToken.role,
          user: decodedToken.user,
        },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: AUTH_FAIL, payload: err });
  }
};

// authThunks.js
export const refreshTokenThunk = () => async (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");


  if (!refreshToken) {
    return dispatch(logoutUser()); 
  }

  dispatch({ type: REFRESH_TOKEN_REQUEST });

  try {
    const { data } = await userRefreshToken(refreshToken);
 
    const { token, refreshToken: newRefreshToken } = data;

    localStorage.setItem("token", token);
    // if (newRefreshToken) {
    //   localStorage.setItem("refreshToken", newRefreshToken);
    // }

    dispatch({ type: REFRESH_TOKEN_SUCCESS, payload: token });
  } catch (error) {


    console.log(error);
    
    dispatch({ type: REFRESH_TOKEN_FAIL, payload: error });
    dispatch(logoutUser()); // Optionally logout user on failure
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("token");
  // localStorage.removeItem("refreshToken");
  dispatch({ type: LOGOUT });
};
