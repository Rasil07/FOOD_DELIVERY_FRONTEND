import {
  ADD_DISH_TO_CART,
  DELETE_DISH_FROM_CART,
  SUBMIT_ORDER_OF_CART_REQUEST,
  SUBMIT_ORDER_OF_CART_SUCCESS,
  SUBMIT_ORDER_OF_CART_FAILURE,
  CHANGE_QUANTITY_OF_DISH_CART,
  CLEAR_CART,
  LOAD_DISH_TO_CART,
} from "../actions/types";

const inititalState = {
  allItems: [],
  addedItems: [],
  total: 0,
  isSubmitting: false,
  isSubmitted: false,
};

const cartReducer = (state = inititalState, action) => {
  switch (action.type) {
    case LOAD_DISH_TO_CART:
      return {
        ...state,
        allItems: action.payload,
      };
    case ADD_DISH_TO_CART: {
      const items = state.allItems;
      if (items.length > 0) {
        let addedItem = items.find((item) => item._id === action.payload);
        let existedItem = state.addedItems.find(
          (item) => action.payload === item._id
        );
        if (existedItem) {
          addedItem.quantity += 1;
          return {
            ...state,
            total: state.total + addedItem.price,
          };
        } else {
          addedItem.quantity = 1;
          let newTotal = state.total + addedItem.price;
          return {
            ...state,
            addedItems: [...state.addedItems, addedItem],
            total: newTotal,
          };
        }
      }
    }
    case CHANGE_QUANTITY_OF_DISH_CART: {
      const items = state.allItems;
      const { id, quantity } = action.payload;
      let itemToBeChanged = items.find((item) => id === item._id);
      let prevQuantity = itemToBeChanged.quantity;

      let quantityDifference = quantity - prevQuantity;
      itemToBeChanged.quantity = quantity;
      let newTotal = state.total + itemToBeChanged.price * quantityDifference;
      return {
        ...state,
        total: newTotal,
      };
    }
    case SUBMIT_ORDER_OF_CART_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case SUBMIT_ORDER_OF_CART_FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };
    case SUBMIT_ORDER_OF_CART_SUCCESS:
      return {
        ...state,
        isSubmitted: true,
        isSubmitting: false,
      };
    case CLEAR_CART:
      return {
        ...state,
        addedItems: [],
        total: 0,
      };
    //still some tasks remaining
    case DELETE_DISH_FROM_CART: {
      const items = state.addedItems;
      let itemToBeChanged = items.find((item) => action.payload === item._id);
      let quantityDifference = itemToBeChanged.quantity - 0;
      let newTotal = state.total - quantityDifference * itemToBeChanged.price;
      let indexOfItemToBEChanged = items.indexOf(itemToBeChanged);

      let newAddedItemsArray = items.splice(indexOfItemToBEChanged, 1);

      return {
        ...state,
        total: newTotal,
      };
    }
    default:
      return state;
  }
};
export default cartReducer;
