import {
  toastError,
  toastSuccess,
} from "../../../components/Utility/ToastUtils";
import * as COUPON from "../../actions/Coupon/Coupon.actions";

const initialState = {
  coupons: null,
  couponObj: null,
  loading: false,
  error: null,
  couponsCount: 0,
  totalPages: 0,
};

export const CouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUPON.COUPON_ADD:
      return {
        ...state,
        loading: true,
      };
    case COUPON.COUPON_MULTIPLE_ADD:
      return {
        ...state,
        loading: true,
      };
    case COUPON.COUPON_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case COUPON.COUPON_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case COUPON.COUPON_MULTIPLE_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        coupons: action.payload.data,
      };
    case COUPON.GET_ALL_COUPONS:
      return {
        ...state,
        loading: true,
      };
    case COUPON.GET_ALL_COUPONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        coupons: action.payload.data,
        couponsCount: action.payload.count,
        totalPages: action.payload.totalPages,
      };
    case COUPON.GET_ALL_COUPONS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COUPON.DELETE_COUPON_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case COUPON.DELETE_COUPON_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case COUPON.DELETE_COUPON_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case COUPON.SET_COUPON_OBJ:
      return {
        ...state,
        loading: true,
      };
    case COUPON.SET_COUPON_OBJ_SUCCESS:
      // toastSuccess(action.payload.message);
      return {
        ...state,
        couponObj: action.payload.data,
        loading: false,
        error: null,
      };
    case COUPON.SET_COUPON_OBJ_FAIL:
      // toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
