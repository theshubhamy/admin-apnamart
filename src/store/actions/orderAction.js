import {
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_FAIL,
  CLEAR_ERRORS,
} from "../constants";
import apnaMart from "../../api/apnaMart";
export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await apnaMart.get("/admin/get-all-orders", config);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clear All Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
