// MobileMenu.tsx
import { logout } from "@slices/authSlice";
import { useState } from "react";
import {
  FaAlignJustify,
  FaHome,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaThList,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FooterLinks from "../Footer/FooterLink";

export default function MobileMenu() {
  // 1.State
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isAuthenticated);

  // 2.Functions
  const logoutAndCloseMenu = () => {
    setIsOpen(false);
    dispatch(logout());
  };
  // 3.Others

  // 4.Render
  return (
    <div className="md:flex lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white text-xl p-2"
        aria-label="bouton burger navbar"
      >
        {isOpen ? <FaTimes /> : <FaAlignJustify />}
      </button>
      {isOpen && (
        <div className="absolute z-1 top-16 left-0 w-full bg-primaryBackground p-4 flex flex-col space-y-4 shadow-md">
          <Link
            to="/"
            className="text-white flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FaHome className="mr-2" /> Accueil
          </Link>
          <Link
            to="/cart"
            className="text-white flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FaShoppingCart className="mr-2" /> Mon panier
          </Link>
          <Link
            to="/categories"
            className="text-white flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FaThList className="mr-2" /> Catégories
          </Link>

          {isLogged ? (
            <Link
              onClick={() => logoutAndCloseMenu()}
              className="text-white flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Se déconnecter
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <FaSignInAlt className="mr-2" /> Me connecter
            </Link>
          )}

          {isLogged && (
            <Link
              to="/profile"
              className="text-white flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <FaUser className="mr-2" /> Mon compte
            </Link>
          )}
          <hr className="my-4 border-gray-600" />
          <FooterLinks className={"flex flex-col gap-2 text-sm text-white"} />
        </div>
      )}
    </div>
  );
}
