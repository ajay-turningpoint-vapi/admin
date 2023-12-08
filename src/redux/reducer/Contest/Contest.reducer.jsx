import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as CONTEST from "../../actions/Contest/Contest.actions";

const initialState = {
  Contests: null,
  ContestObj: null,
  loading: false,
  error: null,
};

export const ContestReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTEST.CONTEST_ADD:
      return {
        ...state,
        loading: true,
      };
    case CONTEST.CONTEST_ADD_SUCCESS:
      //   console.log(act);
      toastSuccess(action.payload);

      return {
        ...state,
        loading: false,
      };
    case CONTEST.CONTEST_ADD_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CONTEST.GET_ALL_CONTESTS:
      return {
        ...state,
        loading: true,
      };
    case CONTEST.GET_ALL_CONTESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        Contests: action.payload.data,
      };
    case CONTEST.GET_ALL_CONTESTS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CONTEST.DELETE_CONTEST_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case CONTEST.DELETE_CONTEST_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CONTEST.DELETE_CONTEST_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    case CONTEST.UPDATE_CONTEST_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case CONTEST.UPDATE_CONTEST_BY_ID_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CONTEST.UPDATE_CONTEST_BY_ID_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CONTEST.SET_CONTEST_OBJ:
      return {
        ...state,
        loading: true,
      };
    case CONTEST.SET_CONTEST_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        ContestObj: action.payload.data,
        loading: false,
        error: null,
      };
    case CONTEST.SET_CONTEST_OBJ_FAIL:
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
