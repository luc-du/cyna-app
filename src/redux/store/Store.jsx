import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../slice/addressSlice";
import authReducer from "../slice/authSlice";
import carouselReducer from "../slice/carouselSlice";
import cartReducer from "../slice/cartSlice";
import categoryReducer from "../slice/categorySlice";
import paymentReducer from "../slice/paymentSlice";
import productReducer from "../slice/productSlice";
import searchReducer from "../slice/searchSlice";
import { topProductsReducer } from "../slice/topProductsSlice";
import uiReducer from "../slice/uiSlice";
import userReducer from "../slice/userSlice";

const store = configureStore({
  reducer: {
    carousel: carouselReducer,
    cart: cartReducer,
    auth: authReducer,
    address: addressReducer,
    categories: categoryReducer,
    products: productReducer,
    topProducts: topProductsReducer,
    search: searchReducer,
    user: userReducer,
    payment: paymentReducer,
    ui: uiReducer,
  },
});

export default store;
