import { combineReducers } from "redux";
import * as AllReducer from "./_redux/AllReducer";

export const rootReducer = combineReducers({
  items: AllReducer.itemReducer,
  card: AllReducer.cardReducer,
});
