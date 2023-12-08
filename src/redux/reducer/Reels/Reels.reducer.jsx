import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as Reels from "../../actions/Reels/reels.actions";

const initialState = {
  reels: null,
  reelsObj: null,
  loading: false,
  error: null,
};

export const ReelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Reels.REELS_ADD:
      return {
        ...state,
        loading: true,
      };
    case Reels.REELS_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case Reels.REELS_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Reels.GET_ALL_REELS:
      return {
        ...state,
        loading: true,
      };
    case Reels.GET_ALL_REELS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        reels: action.payload.data,
      };
    case Reels.GET_ALL_REELS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Reels.DELETE_REELS_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Reels.DELETE_REELS_BY_ID_SUCCESS:
      toastSuccess(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Reels.DELETE_REELS_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Reels.SET_REELS_OBJ:
      return {
        ...state,
        loading: true,
      };
    case Reels.SET_REELS_OBJ_SUCCESS:
      // toastSuccess(action.payload.message);
      return {
        ...state,
        reelsObj: action.payload.data,
        loading: false,
        error: null,
      };
    case Reels.SET_REELS_OBJ_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    case Reels.UPDATE_REELS_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case Reels.UPDATE_REELS_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case Reels.UPDATE_REELS_BY_ID_FAIL:
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
