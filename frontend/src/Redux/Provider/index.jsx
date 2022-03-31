import { combineReducers } from "redux";
import UserReducer from "../Reducer/UserReducer";
import AdminReducer from "../Reducer/AdminReducer";
import FoodOrderReducer from "../Reducer/FoodOrderReducer";
import GlobalReducer from "../Reducer/GlobalReducer";

export const RootReducer = combineReducers({
  UserReducer,
  AdminReducer,
  FoodOrderReducer,
  GlobalReducer,
});
