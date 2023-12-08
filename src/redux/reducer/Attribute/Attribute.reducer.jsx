import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as ATTRIBUTE from "../../actions/Attribute/Attribute.actions";

const initialState = {
  attributeValues: null,
  attributeValueObj: null,
  attributes: null,
  attributeObj: null,
  loading: false,
  error: null,
};

export const AttributeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ATTRIBUTE.ATTRIBUTE_VALUE_ADD:
      return {
        ...state,
        loading: true,
      };
    case ATTRIBUTE.ATTRIBUTE_VALUE_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case ATTRIBUTE.ATTRIBUTE_VALUE_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ATTRIBUTE.GET_ALL_ATTRIBUTE_VALUES:
      return {
        ...state,
        loading: true,
      };
    case ATTRIBUTE.GET_ALL_ATTRIBUTE_VALUES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        attributeValues: action.payload.data,
      };
    case ATTRIBUTE.GET_ALL_ATTRIBUTE_VALUES_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ATTRIBUTE.DELETE_ATTRIBUTE_VALUE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case ATTRIBUTE.DELETE_ATTRIBUTE_VALUE_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ATTRIBUTE.DELETE_ATTRIBUTE_VALUE_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ATTRIBUTE.SET_ATTRIBUTE_VALUE_OBJ:
      return {
        ...state,
        loading: true,
      };
    case ATTRIBUTE.SET_ATTRIBUTE_VALUE_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        attributeValueObj: action.payload.data,
        loading: false,
        error: null,
      };
    case ATTRIBUTE.SET_ATTRIBUTE_VALUE_OBJ_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ATTRIBUTE.ATTRIBUTE_ADD:
      return {
        ...state,
        loading: true,
      };
    case ATTRIBUTE.ATTRIBUTE_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case ATTRIBUTE.ATTRIBUTE_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ATTRIBUTE.GET_ALL_ATTRIBUTE:
      return {
        ...state,
        loading: true,
      };
    case ATTRIBUTE.GET_ALL_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        attributes: action.payload.data,
      };
    case ATTRIBUTE.GET_ALL_ATTRIBUTE_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ATTRIBUTE.DELETE_ATTRIBUTE_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case ATTRIBUTE.DELETE_ATTRIBUTE_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ATTRIBUTE.DELETE_ATTRIBUTE_BY_ID_SUCCESS:
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
