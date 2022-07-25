import {
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  NEW_PRODUCT_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
} from "../constants";

export const newProductReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload,
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        product: null,
      };
    default:
      return state;
  }
};
export const allProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };
    case ALL_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        product: null,
      };
    default:
      return state;
  }
};
export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        product: null,
      };
    default:
      return state;
  }
};
