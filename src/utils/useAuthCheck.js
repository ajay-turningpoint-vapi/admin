import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  logoutUser,
  refreshTokenThunk,
} from "../redux/actions/auth/auth.actions";
import { toastError } from "../components/Utility/ToastUtils";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkTokenExpiry = () => {
      if (token) {
        try {
          const { exp } = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000);

          if (exp < currentTime) {
            dispatch(refreshTokenThunk());
          }
        } catch (error) {
          console.error("Token decoding error:", error);
          dispatch(logoutUser());

          window.location.replace("/");
        }
      }
    };

    checkTokenExpiry();
  }, [token, dispatch]);
};
