import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as BANNER from "../../actions/Banner/Banner.actions";

const initialState = {
  banners: null,
  bannerObj: null,
  loading: false,
  error: null,
};

export const BannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case BANNER.BANNER_ADD:
      return {
        ...state,
        loading: true,
      };
    case BANNER.BANNER_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case BANNER.BANNER_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case BANNER.GET_ALL_BANNERS:
      return {
        ...state,
        loading: true,
      };
    case BANNER.GET_ALL_BANNERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        banners: action.payload.data,
      };
    case BANNER.GET_ALL_BANNERS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case BANNER.DELETE_BANNER_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case BANNER.DELETE_BANNER_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case BANNER.DELETE_BANNER_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case BANNER.SET_BANNER_OBJ:
      return {
        ...state,
        loading: true,
      };
    case BANNER.SET_BANNER_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        bannerObj: action.payload.data,
        loading: false,
        error: null,
      };
    case BANNER.SET_BANNER_OBJ_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
