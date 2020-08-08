import { combineReducers } from "redux";
import errorReducer from "./reducers/errorReducer";
import authReducer from "./reducers/authReducer";
import dishReducer from "./reducers/dishReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  dishes: dishReducer,
  cart: cartReducer,
});
export default rootReducer;
