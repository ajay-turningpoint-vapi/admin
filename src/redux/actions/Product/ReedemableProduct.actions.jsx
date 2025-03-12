import {
  addReedemableProduct,
  deleteReedemableProductById,
  getReedemableProducts,
  updateReedemableProductById,
} from "../../../services/product.service";

// Action Types
export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";

// Fetch Products
export const fetchReedemProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const { data } = await getReedemableProducts();

    
    
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};

// Add Product
export const addReedemProduct = (product) => async (dispatch) => {
  try {
    const { data } = await addReedemableProduct(product);

    
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

// Edit Product
export const editReedemProduct = (productId, updatedProduct) => async (dispatch) => {
  try {
    const { data } = await updateReedemableProductById(
      updatedProduct,
      productId
    );
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Delete Product
export const deleteReedemProduct = (productId) => async (dispatch) => {
  try {
    await deleteReedemableProductById(productId);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
