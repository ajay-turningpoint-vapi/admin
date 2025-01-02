import {
  CREATE_PROMOTION_REQUEST,
  CREATE_PROMOTION_SUCCESS,
  CREATE_PROMOTION_FAILURE,
  GET_PROMOTIONS_REQUEST,
  GET_PROMOTIONS_SUCCESS,
  GET_PROMOTIONS_FAILURE,
  GET_PROMOTION_BY_ID_REQUEST,
  GET_PROMOTION_BY_ID_SUCCESS,
  GET_PROMOTION_BY_ID_FAILURE,
  UPDATE_PROMOTION_REQUEST,
  UPDATE_PROMOTION_SUCCESS,
  UPDATE_PROMOTION_FAILURE,
  DELETE_PROMOTION_REQUEST,
  DELETE_PROMOTION_SUCCESS,
  DELETE_PROMOTION_FAILURE,
} from "../../actions/Promotion/Promotions.actions";

// Initial state for promotions
const initialState = {
  promotions: [],
  promotion: null,
  loading: false,
  error: null,
};

// Reducer function to handle promotion actions
const promotionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROMOTION_REQUEST:
    case GET_PROMOTIONS_REQUEST:
    case GET_PROMOTION_BY_ID_REQUEST:
    case UPDATE_PROMOTION_REQUEST:
    case DELETE_PROMOTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        promotions: [...state.promotions, action.payload.promotion], // Add the new promotion
      };

    case GET_PROMOTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        promotions: action.payload,
      };

    case GET_PROMOTION_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        promotion: action.payload,
      };

    case UPDATE_PROMOTION_SUCCESS:
      console.log("State before update:", state.promotions);
      console.log("Action payload:", action.payload);

      // Assuming the payload contains the updated promotion inside the 'promotion' key
      const updatedPromotions = state.promotions.map(
        (promotion) =>
          promotion._id === action.payload.promotion._id
            ? { ...promotion, ...action.payload.promotion } // Update the matching promotion
            : promotion // Keep other promotions unchanged
      );

      console.log("State after update:", updatedPromotions);

      return {
        ...state,
        loading: false,
        promotions: updatedPromotions,
      };

    case DELETE_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        promotions: state.promotions.filter(
          (promotion) => promotion._id !== action.payload.deletedPromotion._id
        ),
      };

    case CREATE_PROMOTION_FAILURE:
    case GET_PROMOTIONS_FAILURE:
    case GET_PROMOTION_BY_ID_FAILURE:
    case UPDATE_PROMOTION_FAILURE:
    case DELETE_PROMOTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default promotionReducer;
