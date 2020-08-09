import {
  ADD_DISH_TO_CART,
  DELETE_DISH_FROM_CART,
  SUBMIT_ORDER_OF_CART_REQUEST,
  SUBMIT_ORDER_OF_CART_SUCCESS,
  SUBMIT_ORDER_OF_CART_FAILURE,
  INCREMENT_NUMBER_OF_DISH_CART,
  DECREMENT_NUMBER_OF_DISH_CART,
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
    default:
      return state;
  }
};
export default cartReducer;

// case ADD_DISH_TO_CART: {
//     let items = state.allItems;
//     if (items.length > 0) {
//       let addedItems = items.find((item) => item._id === action.payload);
//       let existed_item = state.addedItems.find(
//         (item) => action.payload === item.id
//       );
//     }
//     if (existed_item) {
//       addedItem.quantity += 1;
//       return {
//         ...state,
//         total: state.total + addedItem.price,
//       };
//     }
//   }
