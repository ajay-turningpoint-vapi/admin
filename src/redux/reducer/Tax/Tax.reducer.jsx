import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as Tax from "../../actions/Tax/Tax.actions";

const initialState = {
  taxes: null,
  taxObj: null,
  loading: false,
  error: null,
};

export const TaxReducer = (state = initialState, action) => {
  switch (action.type) {
    case Tax.TAX_ADD:
      return {
        ...state,
        loading: true,
      };
    case Tax.TAX_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case Tax.TAX_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Tax.GET_ALL_TAXS:
      return {
        ...state,
        loading: true,
      };
    case Tax.GET_ALL_TAXS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        taxes: action.payload.data,
      };
    case Tax.GET_ALL_TAXS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Tax.DELETE_TAX_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Tax.DELETE_TAX_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Tax.DELETE_TAX_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Tax.SET_TAX_OBJ:
      return {
        ...state,
        loading: true,
      };
    case Tax.SET_TAX_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        taxObj: action.payload.data,
        loading: false,
        error: null,
      };
    case Tax.SET_TAX_OBJ_FAIL:
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
