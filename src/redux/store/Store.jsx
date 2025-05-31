import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../slice/addressSlice";
import authReducer from "../slice/authSlice";
import cartReducer from "../slice/cartSlice";
import { categoryReducer } from "../slice/categorySlice";
import { topProductsReducer } from "../slice/topProductsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    address: addressReducer,
    categories: categoryReducer,
    topProducts: topProductsReducer,
  },
});

export default store;
