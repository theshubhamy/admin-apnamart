import {
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_FAIL,
  CLEAR_ERRORS,
} from "../constants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };
    case ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ALL_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
