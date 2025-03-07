import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ProductList from "../components/ProductList";
import AdminDashboard from "../pages/AdminDashboard";
import CartPage from "../pages/CartPage";
import CategoriesPage from "../pages/CategoriesPage";
import CategoryPage from "../pages/CategoryPage";
import Checkout from "../pages/Checkout";
import ContactPage from "../pages/ContactPage";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import OrderPage from "../pages/OrderPage";
import PageNotFound from "../pages/PageNotFound";
import ProductPage from "../pages/ProductPage";
import Profile from "../pages/Profile";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";
import store from "../redux/store/Store";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product:id" element={<ProductPage />} />

        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductPage />} />

        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/profile"
          element={<PrivateRoute component={<Profile />} />}
        />
        <Route
          path="/admin"
          element={<PrivateRoute component={<AdminDashboard />} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Provider>
  );
};

export default AppRouter;
