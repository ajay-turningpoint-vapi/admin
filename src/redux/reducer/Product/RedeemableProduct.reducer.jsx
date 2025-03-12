import { ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS, UPDATE_PRODUCT_SUCCESS } from "../../actions/Product/ReedemableProduct.actions";

  
  const initialState = {
    products: [],
    loading: false,
    error: null,
  };
  
  export const redeemproductReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
        return { ...state, loading: true };
      case FETCH_PRODUCTS_SUCCESS:
        return { loading: false, products: action.payload, error: null };
      case FETCH_PRODUCTS_FAILURE:
        return { loading: false, error: action.payload };
      case ADD_PRODUCT_SUCCESS:
        return { ...state, products: [...state.products, action.payload] };
      case UPDATE_PRODUCT_SUCCESS:
        return {
          ...state,
          products: state.products.map((product) =>
            product._id === action.payload._id ? action.payload : product
          ),
        };
      case DELETE_PRODUCT_SUCCESS:
        return {
          ...state,
          products: state.products.filter((product) => product._id !== action.payload),
        };
      default:
        return state;
    }
  };
  