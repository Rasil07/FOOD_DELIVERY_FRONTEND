import axios from "axios";
import { returnError, clearErrors } from "./errorActions";
import history from "../../utils/history";

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

export const deleteDish = () => (dispatch) => {
  dispatch({ type: DELETE_DISH_SUCCESS });
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
      // console.log("response data", res.data.dishes);
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
