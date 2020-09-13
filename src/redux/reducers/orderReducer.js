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
} from "../actions/types";

const initialState = {
  isloading: false,
  orders: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
    case DELETE_ALL_ORDER_REQUEST:
      return {
        ...state,
        isloading: true,
      };
    case GET_ALL_ORDER_FAILURE:
    case DELETE_ORDER_FAILURE:
    case DELETE_ORDER_SUCCESS:
    case DELETE_ALL_ORDER_SUCCESS:
    case DELETE_ALL_ORDER_FAILURE:
      return {
        ...state,
        isloading: false,
      };

    case GET_ALL_ORDER_SUCCESS:
      return {
        ...state,
        isloading: false,
        orders: action.payload,
      };
    default:
      return state;
  }
}
