import axios from "axios";
import { returnError, clearErrors } from "./errorActions";
import history from "../../utils/history";
import { getResponseMessage, clearMessage } from "./messageActions";
import {
  GET_DISHES_REQUEST,
  GET_DISHES_SUCCESS,
  GET_DISHES_FAILURE,
  ADD_DISH_REQUEST,
  ADD_DISH_SUCCESS,
  ADD_DISH_FAILURE,
  EDIT_DISH_REQUEST,
  EDIT_DISH_SUCCESS,
  EDIT_DISH_FAILURE,
  DELETE_DISH_REQUEST,
  DELETE_DISH_SUCCESS,
  DELETE_DISH_FAILURE,
  LOAD_DISH_TO_CART,
} from "./types";
import { tokenConfig } from "../../utils/tokenConfig";

export const addDish = (data) => (dispatch, getState) => {
  dispatch({
    type: ADD_DISH_REQUEST,
  });
  axios
    .post("/dish/add", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": tokenConfig(getState),
      },
    })
    .then((res) => {
      dispatch(getResponseMessage(res.data.message));
      setTimeout(() => dispatch(clearMessage()), 2000);
      dispatch({
        type: ADD_DISH_SUCCESS,
      });
      dispatch(loadDishes());
    })
    .catch((err) => {
      dispatch({
        type: ADD_DISH_FAILURE,
      });
      dispatch(returnError(err.response.data.message, err.response.status));
      setTimeout(() => dispatch(clearErrors()), 3000);
    });
};

export const editDish = (id, data) => (dispatch, getState) => {
  console.log(id, data);
  dispatch({
    type: EDIT_DISH_REQUEST,
  });
  axios
    .post(`/dish/edit/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": tokenConfig(getState),
      },
    })
    .then((res) => {
      dispatch(getResponseMessage(res.data.message));
      setTimeout(() => dispatch(clearMessage()), 2000);
      dispatch({
        type: EDIT_DISH_SUCCESS,
      });
      dispatch(loadDishes());
    })
    .catch((err) => {
      dispatch({
        type: EDIT_DISH_FAILURE,
      });
      dispatch(returnError(err.response.data.message, err.response.status));
      setTimeout(() => dispatch(clearErrors()), 3000);
    });
};

export const deleteDish = (id) => (dispatch, getState) => {
  dispatch({ type: DELETE_DISH_REQUEST });
  axios
    .post(`/dish/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": tokenConfig(getState),
      },
    })
    .then((res) => {
      dispatch({
        type: DELETE_DISH_SUCCESS,
      });
      dispatch(getResponseMessage(res.data.message));
      setTimeout(() => dispatch(clearMessage()), 2000);
      dispatch(loadDishes());
    })
    .catch((err) => {
      dispatch({
        type: DELETE_DISH_FAILURE,
      });
      dispatch(returnError(err.response.data.message, err.response.status));
      setTimeout(() => dispatch(clearErrors()), 3000);
    });
};

export const loadDishes = () => (dispatch, getState) => {
  dispatch({ type: GET_DISHES_REQUEST });
  axios
    .get("/dish/", {
      headers: {
        "Content-Type": "application/json",
        "auth-token": tokenConfig(getState),
      },
    })
    .then((res) => {
      dispatch({
        type: GET_DISHES_SUCCESS,
        payload: res.data.dishes,
      });
      dispatch({
        type: LOAD_DISH_TO_CART,
        payload: res.data.dishes,
      });
    })
    .catch((err) => {
      console.log(err.message);
      // dispatch(returnError(err.response.data.message.msg, err.response.status));
      dispatch({
        type: GET_DISHES_FAILURE,
      });
    });
};
