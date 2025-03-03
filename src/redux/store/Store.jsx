import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
