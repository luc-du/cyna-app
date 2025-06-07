import { configureStore } from "@reduxjs/toolkit";
import addressReducer from "../slice/addressSlice";
import authReducer from "../slice/authSlice";
import carouselReducer from "../slice/carouselSlice";
import cartReducer from "../slice/cartSlice";
import categoryReducer from "../slice/categorySlice";
import productReducer from "../slice/productSlice";
import { topProductsReducer } from "../slice/topProductsSlice";

const store = configureStore({
  reducer: {
    carousel: carouselReducer,
    cart: cartReducer,
    auth: authReducer,
    address: addressReducer,
    categories: categoryReducer,
    products: productReducer,
    topProducts: topProductsReducer,
  },
});

export default store;

/* checked */
