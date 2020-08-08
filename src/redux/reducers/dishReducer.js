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
} from "../actions/types";

const initialState = {
  isloading: false,
  dishes: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DISHES_REQUEST:
    case ADD_DISH_REQUEST:
    case EDIT_DISH_REQUEST:
    case DELETE_DISH_REQUEST:
      return {
        ...state,
        isloading: true,
      };

    case GET_DISHES_FAILURE:
    case ADD_DISH_FAILURE:
    case EDIT_DISH_FAILURE:
    case DELETE_DISH_FAILURE:
      return {
        ...state,
        isloading: false,
      };

    case GET_DISHES_SUCCESS:
      return {
        ...state,
        isloading: false,
        dishes: action.payload,
      };
    case ADD_DISH_SUCCESS:
      return {
        ...state,
        isloading: false,
      };
    case EDIT_DISH_SUCCESS:
      return {
        ...state,
        isloading: false,
      };
    case DELETE_DISH_SUCCESS:
      return {
        ...state,
        isloading: false,
      };

    default:
      return state;
  }
}
