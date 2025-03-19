import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ProductList from "../components/ProductList";
import CartPage from "../pages/CartPage";
import CategoriesPage from "../pages/CategoriesPage";
import CategoryPage from "../pages/CategoryPage";
import Checkout from "../pages/Checkout";
import ContactPage from "../pages/ContactPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import OrderPage from "../pages/OrderPage";
import PageNotFound from "../pages/PageNotFound";
import ProductPage from "../pages/ProductPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import SearchPage from "../pages/SearchPage";
import store from "../redux/store/Store";

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/product:id" element={<ProductPage />} />

        <Route path="/order" element={<OrderPage />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot_password" element={<ForgotPasswordPage />} />

        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/contact" element={<ContactPage />} />

        {/* <Route
          path="/profile"
          element={<PrivateRoute component={<ProfilePage />} />}
        />
        <Route
          path="/admin"
          element={<PrivateRoute component={<AdminDashboard />} />}
        /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Provider>
  );
};

export default AppRouter;
