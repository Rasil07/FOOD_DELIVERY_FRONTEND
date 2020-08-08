import {
  ADD_DISH_TO_CART,
  DELETE_DISH_FROM_CART,
  SUBMIT_ORDER_OF_CART,
  INCREMENT_NUMBER_OF_DISH_CART,
  DECREMENT_NUMBER_OF_DISH_CART,
  CLEAR_CART,
  LOAD_DISH_TO_CART,
} from "./types";

export const addDish = (id) => {
  return {
    type: ADD_DISH_TO_CART,
    payload: id,
  };
};
