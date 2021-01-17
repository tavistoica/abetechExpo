import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import productsReducer from "./productsReducer";
import settingsReducer from "./settingsReducer";

export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  settings: settingsReducer,
});
