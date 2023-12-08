import { toastError, toastSuccess } from "../../../components/Utility/ToastUtils";
import * as TRANSACTION from "../../actions/Transcaction/Transaction.actions";

const initialState = {
  transaction: null,
  transactionObj: null,
  loading: false,
  error: null,
};

export const TransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTION.GET_ALL_TRANSACTIONS:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTION.GET_ALL_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        transaction: action.payload.data,
      };
    case TRANSACTION.GET_ALL_TRANSACTIONS_FAIL:
      toastError(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case TRANSACTION.SET_TRANSACTION_OBJ:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTION.SET_TRANSACTION_OBJ_SUCCESS:
      toastSuccess(action.payload.message);
      return {
        ...state,
        transactionObj: action.payload.data,
        loading: false,
        error: null,
      };


    case TRANSACTION.UPDATE_TRANSACTION_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case TRANSACTION.UPDATE_TRANSACTION_BY_ID_SUCCESS:
      toastSuccess(action.payload.data);
      return {
        ...state,
        loading: false,
        error: null,
      };
    case TRANSACTION.UPDATE_TRANSACTION_BY_ID_FAIL:
      // toastSuccess(action.payload.data);
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
