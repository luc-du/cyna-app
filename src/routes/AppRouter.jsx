import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import OrderPage from "../pages/OrderPage";
import AdminDashboard from "../pages/AdminDashboard";
import CartPage from "../pages/CartPage";
import Categories from "../pages/Categories";
import Checkout from "../pages/Checkout";
import ContactPage from "../pages/ContactPage";
import Login from "../pages/Login";
import ProductPage from "../pages/ProductPage";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import SearchPage from "../pages/SearchPage";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product:id" element={<ProductPage />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/register" element={<Register />} />
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
    </Routes>
  );
};

export default AppRouter;
