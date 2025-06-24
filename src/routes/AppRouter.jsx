import PrivateRoute from "@/components/guards/PrivateRoute";
import ProductList from "@/components/Products/ProductList";
import CartPage from "@/pages/CartPage";
import CategoriesPage from "@/pages/CategoriesPage";
import CategoryPage from "@/pages/CategoryPage";
import CgvPage from "@/pages/CgvPage";
import CheckoutPage from "@/pages/CheckoutPage";
import ContactPage from "@/pages/ContactPage";
import FAQPage from "@/pages/FAQPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import Homepage from "@/pages/Homepage";
import LegalNoticePage from "@/pages/LegalNoticePage.jsx.jsx";
import LoginPage from "@/pages/LoginPage";
import OrderPage from "@/pages/OrderPage";
import PageNotFound from "@/pages/PageNotFound";
import ProductPage from "@/pages/ProductPage";
import ProfilePage from "@/pages/ProfilePage";
import RegisterPage from "@/pages/RegisterPage";
import SearchPage from "@/pages/SearchPage";
import store from "@/redux/store/Store";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Homepage />} />

        {/* Categories et produits/services */}
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/product:id" element={<ProductPage />} />

        {/* Auth */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot_password" element={<ForgotPasswordPage />} />

        {/* Profile */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<LoginPage />} />

          {/* Flow cart > checkout */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        <Route path="/search" element={<SearchPage />} />

        <Route path="/contact" element={<ContactPage />} />

        {/* Legal */}
        <Route path="/cgv" element={<CgvPage />} />
        <Route path="/legal" element={<LegalNoticePage />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Error */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Provider>
  );
};

export default AppRouter;
