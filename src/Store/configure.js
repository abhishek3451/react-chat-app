import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth-Slice";
import mailReducer from "./Mail-slice";

const store = configureStore({
  reducer: { auth: authReducer, mail: mailReducer },
});

export default store;
