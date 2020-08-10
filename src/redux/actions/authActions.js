import axios from "axios";
import { returnError, clearErrors } from "./errorActions";
import { getResponseMessage, clearMessage } from "./messageActions";
import history from "../../utils/history";
import { tokenConfig } from "../../utils/tokenConfig";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERRORS,
  LOGOUT_SUCCESS,
  CLEAR_CART,
} from "./types";

//logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
  dispatch({ type: CLEAR_CART });
  history.push("/");
};

//load user
export const loadUser = () => (dispatch, getState) => {
  if (tokenConfig(getState)) {
    dispatch({ type: USER_LOADING });
    axios
      .post("/user/decode", {
        headers: {
          "Content-Type": "application/json",
          "auth-token": tokenConfig(getState),
        },
      })
      .then((res) =>
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(returnError(err.response.data.message, err.response.status));
        dispatch({
          type: AUTH_ERRORS,
        });
        setTimeout(() => dispatch(clearErrors()), 3000);
      });
  } else {
    dispatch({
      type: AUTH_ERRORS,
    });
  }
};

//login user

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  axios
    .post("/user/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: res.data,
      });
      dispatch(getResponseMessage(res.data.message));
      setTimeout(() => dispatch(clearMessage()), 2000);
      history.push("/");
      dispatch(clearErrors());
      dispatch(loadUser());
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_USER_FAILURE,
      });

      let errorMessage = err.response.data.message;

      var val = [];
      for (var key in errorMessage) {
        if (errorMessage.hasOwnProperty(key)) {
          val.push(errorMessage[key].msg);
        }
      }
      dispatch(returnError(val, err.response.status, "LOGIN_USER_FAILUER"));
      setTimeout(() => dispatch(clearErrors()), 3000);
    });
};

//register user
export const registerUser = ({
  name,
  email,
  password,
  confirm_password,
  address,
  contact_no,
}) => (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify({
    name,
    email,
    password,
    confirm_password,
    address,
    contact_no,
  });
  axios
    .post("/user/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: res.data,
      });
      dispatch(getResponseMessage(res.data.message));
      setTimeout(() => dispatch(clearMessage()), 2000);
      history.push("/");
      dispatch(clearErrors());
      dispatch(loadUser());
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_USER_FAILURE,
      });
      console.log("actions", err.response);
      let errorMessage = err.response.data.message;

      var val = [];
      for (var key in errorMessage) {
        if (errorMessage.hasOwnProperty(key)) {
          val.push(errorMessage[key].msg);
        }
      }
      dispatch(returnError(val, err.response.status, "REGISTER_USER_FAILURE"));
      setTimeout(() => dispatch(clearErrors()), 3000);
    });
};
