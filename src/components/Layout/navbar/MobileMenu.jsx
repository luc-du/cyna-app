// MobileMenu.tsx
import { useState } from "react";
import {
  FaAlignJustify,
  FaHome,
  FaShoppingCart,
  FaSignInAlt,
  FaThList,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:flex lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white text-xl p-2"
      >
        {isOpen ? <FaTimes /> : <FaAlignJustify />}
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-primaryBackground p-4 flex flex-col space-y-4 shadow-md">
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
          <Link
            to="/login"
            className="text-white flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FaSignInAlt className="mr-2" /> Me connecter
          </Link>
          <Link
            to="/profile"
            className="text-white flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <FaUser className="mr-2" /> Mon compte
          </Link>
        </div>
      )}
    </div>
  );
}
