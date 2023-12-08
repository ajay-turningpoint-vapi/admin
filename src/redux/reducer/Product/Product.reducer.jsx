import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as Product from "../../actions/Product/Product.actions";

const initialState = {
  products: null,
  productObj: null,
  loading: false,
  error: null,
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case Product.PRODUCT_ADD:
      return {
        ...state,
        loading: true,
      };
    case Product.PRODUCT_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case Product.UPDATE_PRODUCT_BY_ID_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case Product.PRODUCT_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Product.GET_ALL_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case Product.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload.data,
      };
    case Product.GET_ALL_PRODUCTS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Product.DELETE_PRODUCT_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Product.DELETE_PRODUCT_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Product.DELETE_PRODUCT_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Product.SET_PRODUCT_OBJ:
      return {
        ...state,
        loading: true,
      };
    case Product.SET_PRODUCT_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        productObj: action.payload.data,
        loading: false,
        error: null,
      };
    case Product.SET_PRODUCT_OBJ_FAIL:
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
