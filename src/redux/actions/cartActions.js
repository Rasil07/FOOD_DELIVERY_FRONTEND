import {
  ADD_DISH_TO_CART,
  DELETE_DISH_FROM_CART,
  SUBMIT_ORDER_OF_CART_REQUEST,
  SUBMIT_ORDER_OF_CART_SUCCESS,
  SUBMIT_ORDER_OF_CART_FAILURE,
  CHANGE_QUANTITY_OF_DISH_CART,
  CLEAR_CART,
  LOAD_DISH_TO_CART,
  GET_ERRORS,
} from "./types";
import { getResponseMessage, clearMessage } from "./messageActions";
import { returnError, clearErrors } from "./errorActions";

import axios from "axios";
import { tokenConfig } from "../../utils/tokenConfig";

export const addDish = (id) => {
  return {
    type: ADD_DISH_TO_CART,
    payload: id,
  };
};

export const changeItemQuantity = (id, quantity) => {
  return {
    type: CHANGE_QUANTITY_OF_DISH_CART,
    payload: { id, quantity },
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_DISH_FROM_CART,
    payload: id,
  };
};
export const placeOrder = (allCartItems) => (dispatch, getState) => {
  dispatch({ type: SUBMIT_ORDER_OF_CART_REQUEST });

  axios
    .post(
      "/order",
      {
        user_id: getState().auth.user.decoded.data.id,
        items: allCartItems.addedItems,
        totalPrice: getState().cart.total,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": tokenConfig(getState),
        },
      }
    )
    .then((res) => {
      dispatch({
        type: SUBMIT_ORDER_OF_CART_SUCCESS,
      });
      dispatch(getResponseMessage(res.data.message));
      setTimeout(() => dispatch(clearMessage()), 2000);
      setTimeout(() => dispatch(clearCart()), 2000);
    })
    .catch((err) => {
      dispatch({
        type: SUBMIT_ORDER_OF_CART_FAILURE,
      });

      let errorMessage = err.response.data.message;

      dispatch(returnError(errorMessage, err.response.status));
      setTimeout(() => dispatch(clearErrors()), 2000);
    });
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
