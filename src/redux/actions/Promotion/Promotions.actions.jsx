import toast from "react-hot-toast";
import {
  addPromotion,
  deletePromotionById,
  getPromotionById,
  getPromotions,
  updatePromotionById,
} from "../../../services/promotions.service";

// actions/promotionActions.js
export const CREATE_PROMOTION_REQUEST = "CREATE_PROMOTION_REQUEST";
export const CREATE_PROMOTION_SUCCESS = "CREATE_PROMOTION_SUCCESS";
export const CREATE_PROMOTION_FAILURE = "CREATE_PROMOTION_FAILURE";

export const GET_PROMOTIONS_REQUEST = "GET_PROMOTIONS_REQUEST";
export const GET_PROMOTIONS_SUCCESS = "GET_PROMOTIONS_SUCCESS";
export const GET_PROMOTIONS_FAILURE = "GET_PROMOTIONS_FAILURE";

export const GET_PROMOTION_BY_ID_REQUEST = "GET_PROMOTION_BY_ID_REQUEST";
export const GET_PROMOTION_BY_ID_SUCCESS = "GET_PROMOTION_BY_ID_SUCCESS";
export const GET_PROMOTION_BY_ID_FAILURE = "GET_PROMOTION_BY_ID_FAILURE";

export const UPDATE_PROMOTION_REQUEST = "UPDATE_PROMOTION_REQUEST";
export const UPDATE_PROMOTION_SUCCESS = "UPDATE_PROMOTION_SUCCESS";
export const UPDATE_PROMOTION_FAILURE = "UPDATE_PROMOTION_FAILURE";

export const DELETE_PROMOTION_REQUEST = "DELETE_PROMOTION_REQUEST";
export const DELETE_PROMOTION_SUCCESS = "DELETE_PROMOTION_SUCCESS";
export const DELETE_PROMOTION_FAILURE = "DELETE_PROMOTION_FAILURE";

export const createPromotion = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PROMOTION_REQUEST });

    const response = await addPromotion(formData);
    dispatch({
      type: CREATE_PROMOTION_SUCCESS,
      payload: response.data,
    });
    if (response.data.message) {
      toast.success(response.data.message);
    }
  } catch (error) {
    dispatch({
      type: CREATE_PROMOTION_FAILURE,
      payload: error.response
        ? error.response.data
        : "Failed to create promotion",
    });
  }
};

export const fetchPromotions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROMOTIONS_REQUEST });

    const response = await getPromotions(); // API call
    dispatch({
      type: GET_PROMOTIONS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROMOTIONS_FAILURE,
      payload: error.response
        ? error.response.data
        : "Failed to get promotions",
    });
  }
};

export const fetchPromotionById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROMOTION_BY_ID_REQUEST });

    const response = await getPromotionById(id); // API call

    dispatch({
      type: GET_PROMOTION_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROMOTION_BY_ID_FAILURE,
      payload: error.response ? error.response.data : "Failed to get promotion",
    });
  }
};

export const updatePromotion = (id, formData) => async (dispatch) => {

  console.log("updatePromotion", id, formData);
  
  try {
    dispatch({ type: UPDATE_PROMOTION_REQUEST });

    const response = await updatePromotionById(id, formData); // Pass id here
    console.log("update", response);
    if (response.data.message) {
      toast.success(response.data.message);
    }

    dispatch({
      type: UPDATE_PROMOTION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROMOTION_FAILURE,
      payload: error.response
        ? error.response.data
        : "Failed to update promotion",
    });
  }
};

export const deletePromotion = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PROMOTION_REQUEST });

    const response = await deletePromotionById(id);
    console.log("delete", response);

    dispatch({
      type: DELETE_PROMOTION_SUCCESS,
      payload: response.data,
    });
    if (response.data.message) {
      toast.success(response.data.message);
    }
  } catch (error) {
    dispatch({
      type: DELETE_PROMOTION_FAILURE,
      payload: error.response
        ? error.response.data
        : "Failed to delete promotion",
    });
  }
};
