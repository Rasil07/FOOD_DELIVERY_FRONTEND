import { combineReducers } from "redux";
import errorReducer from "./reducers/errorReducer";
import authReducer from "./reducers/authReducer";
import dishReducer from "./reducers/dishReducer";
import cartReducer from "./reducers/cartReducer";
import messageReducer from "./reducers/messageReducer";
const rootReducer = combineReducers({
  error: errorReducer,
  auth: authReducer,
  dishes: dishReducer,
  cart: cartReducer,
  message: messageReducer,
});
export default rootReducer;
