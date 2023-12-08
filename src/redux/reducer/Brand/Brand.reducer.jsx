import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as Brand from "../../actions/Brand/brand.actions";

const initialState = {
  brands: null,
  brandObj: null,
  loading: false,
  error: null,
};

export const BrandReducer = (state = initialState, action) => {
  switch (action.type) {
    case Brand.BRAND_ADD:
      return {
        ...state,
        loading: true,
      };
    case Brand.BRAND_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case Brand.BRAND_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Brand.GET_ALL_BRANDS:
      return {
        ...state,
        loading: true,
      };
    case Brand.GET_ALL_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        brands: action.payload.data,
      };
    case Brand.GET_ALL_BRANDS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Brand.DELETE_BRAND_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Brand.DELETE_BRAND_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Brand.DELETE_BRAND_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Brand.SET_BRAND_OBJ:
      return {
        ...state,
        loading: true,
      };
    case Brand.SET_BRAND_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        brandObj: action.payload.data,
        loading: false,
        error: null,
      };
    case Brand.SET_BRAND_OBJ_FAIL:
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
