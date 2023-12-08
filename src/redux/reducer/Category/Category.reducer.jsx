import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as Category from "../../actions/Category/Category.actions";

const initialState = {
  categories: null,
  categoryObj: null,
  loading: false,
  error: null,
};

export const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case Category.CATEGORY_ADD:
      return {
        ...state,
        loading: true,
      };
    case Category.CATEGORY_ADD_SUCCESS:
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case Category.CATEGORY_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Category.GET_ALL_CATEGORYS:
      return {
        ...state,
        loading: true,
      };
    case Category.GET_ALL_CATEGORYS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.payload.data,
      };
    case Category.GET_ALL_CATEGORYS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Category.DELETE_CATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Category.DELETE_CATEGORY_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Category.DELETE_CATEGORY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Category.UPDATE_CATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Category.UPDATE_CATEGORY_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Category.UPDATE_CATEGORY_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Category.SET_CATEGORY_OBJ:
      return {
        ...state,
        loading: true,
      };
    case Category.SET_CATEGORY_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        categoryObj: action.payload.data,
        loading: false,
        error: null,
      };
    case Category.SET_CATEGORY_OBJ_FAIL:
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
