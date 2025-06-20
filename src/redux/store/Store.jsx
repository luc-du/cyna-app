import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../slice/addressSlice";
import authReducer from "../slice/authSlice";
import carouselReducer from "../slice/carouselSlice";
import cartReducer from "../slice/cartSlice";
import categoryReducer from "../slice/categorySlice";
import paymentReducer from "../slice/paymentSlice";
import priceReducer from "../slice/priceSlice";
import productReducer from "../slice/productSlice";
import searchReducer from "../slice/searchSlice";
import subscriptionReducer from "../slice/subscriptionSlice";
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
    price: priceReducer,
    ui: uiReducer,
    subscription: subscriptionReducer,
  },
});

export default store;
