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
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("jwt"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      localStorage.setItem("jwt", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case AUTH_ERRORS:
    case LOGIN_USER_FAILURE:
    case LOGOUT_SUCCESS:
    case REGISTER_USER_FAILURE: {
      localStorage.removeItem("jwt");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
