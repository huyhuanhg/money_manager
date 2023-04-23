import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth/slice";
import walletReducer from "./wallet/slice";
import categoryReducer from "./category/slice";
import transactionReducer from "./transaction/slice";

const reducer = combineReducers({
  authReducer,
  walletReducer,
  categoryReducer,
  transactionReducer,
});

const store = configureStore({
  reducer,
});

export default store;
