import axios from "axios";
import { returnError, clearErrors } from "./errorActions";
import { getResponseMessage, clearMessage } from "./messageActions";
import {
  GET_ALL_ORDER_SUCCESS,
  GET_ALL_ORDER_REQUEST,
  GET_ALL_ORDER_FAILURE,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ALL_ORDER_REQUEST,
  DELETE_ALL_ORDER_FAILURE,
  DELETE_ALL_ORDER_SUCCESS,
} from "./types";
import { tokenConfig } from "../../utils/tokenConfig";

export const getAllOrders = () => (dispatch, getState) => {
  dispatch({
    type: GET_ALL_ORDER_REQUEST,
  });
  axios
    .get("/order/", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": tokenConfig(getState),
      },
    })
    .then((res) => {
      dispatch({
        type: GET_ALL_ORDER_SUCCESS,
        payload: res.data.orders,
      });
    })
    .catch((err) => {
      dispatch({ type: GET_ALL_ORDER_FAILURE });
      dispatch(returnError(err.response.data.message, err.response.status));
      setTimeout(() => dispatch(clearErrors()), 3000);
    });
};

export const deleteOrder = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_ORDER_REQUEST,
  });
  axios
    .delete(`/order/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": tokenConfig(getState),
      },
    })
    .then((res) => {
      dispatch(getResponseMessage(res.data.message));
      setTimeout(() => dispatch(clearMessage()), 2000);
      dispatch({
        type: DELETE_ORDER_SUCCESS,
      });
      dispatch(getAllOrders());
    })
    .catch((err) => {
      dispatch({
        type: DELETE_ORDER_FAILURE,
      });
      dispatch(returnError(err.response.data.message, err.response.status));
      setTimeout(() => dispatch(clearErrors()), 3000);
    });
};
