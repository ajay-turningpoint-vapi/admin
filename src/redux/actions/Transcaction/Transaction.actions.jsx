import { getTransaction, updateTransactionStatus } from "../../../services/transaction.service";

export const GET_ALL_TRANSACTIONS = "GET_ALL_TRANSACTIONS";
export const GET_ALL_TRANSACTIONS_SUCCESS = "GET_ALL_TRANSACTIONS_SUCCESS";
export const GET_ALL_TRANSACTIONS_FAIL = "GET_ALL_TRANSACTIONS_FAIL";

export const UPDATE_TRANSACTION_BY_ID = "UPDATE_TRANSACTION_BY_ID";
export const UPDATE_TRANSACTION_BY_ID_SUCCESS = "UPDATE_TRANSACTION_BY_ID_SUCCESS";
export const UPDATE_TRANSACTION_BY_ID_FAIL = "UPDATE_TRANSACTION_BY_ID_FAIL";

export const SET_TRANSACTION_OBJ = "SET_TRANSACTION_OBJ";
export const SET_TRANSACTION_OBJ_SUCCESS = "SET_TRANSACTION_OBJ_SUCCESS";
export const SET_TRANSACTION_OBJ_FAIL = "SET_TRANSACTION_OBJ_FAIL";

export const GET_TRANSACTION_BY_ID = "GET_TRANSACTION_BY_ID";
export const GET_TRANSACTION_BY_ID_SUCCESS = "GET_TRANSACTION_BY_ID_SUCCESS";
export const GET_TRANSACTION_BY_ID_FAIL = "GET_TRANSACTION_BY_ID_FAIL";
export const TRANSACTION_ADD_FAIL = "TRANSACTION_ADD_FAIL";




export const TRANSACTIONGet = (formData) => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TRANSACTIONS });
    let { data: response } = await getTransaction(formData);
    if (response) {
      console.log(response);
      dispatch({
        type: GET_ALL_TRANSACTIONS_SUCCESS,
        payload: { data: response.data, message: response.message },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: TRANSACTION_ADD_FAIL, payload: err });
  }
};

export const SetTRANSACTIONObj = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SET_TRANSACTION_OBJ });
    if (formData) {
      dispatch({
        type: SET_TRANSACTION_OBJ_SUCCESS,
        payload: { data: formData },
      });
    } else {
      dispatch({
        type: SET_TRANSACTION_OBJ_SUCCESS,
        payload: { data: null },
      });
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: SET_TRANSACTION_OBJ_FAIL, payload: { message: "NOT FOUND" } });
  }
};

export const TransactionUpdateStatus = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TRANSACTION_BY_ID });
    let { data: response } = await updateTransactionStatus(formData, id);
    if (response) {
      console.log(response);
      dispatch({
        type: UPDATE_TRANSACTION_BY_ID_SUCCESS,
        payload: { data: response.message },
      });
      dispatch(TRANSACTIONGet())
    }
  } catch (err) {
    console.error(err);
    dispatch({ type: UPDATE_TRANSACTION_BY_ID_FAIL, payload: err });
  }
};


