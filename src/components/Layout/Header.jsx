import {
  FaAlignJustify,
  FaHome,
  FaSearch,
  FaShoppingCart,
  FaSignInAlt,
  FaThList,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-cyna-white.svg";

export default function Header() {
  return (
    <header className="w-full top-0 flex flex-row justify-between items-center p-4 bg-primaryBackground text-white shadow-md">
      <img src={logo} alt="Cyna Logo" className="w-40 sm:w-40" />
      <nav className="navigation-menu flex flex-row space-x-4 items-center">
        <Link
          to="/"
          className="text-white hover:text-gray-400 flex items-center hidden md:flex"
        >
          <FaHome className="mr-2 text-xl sm:text-xl" />
          <span className="hidden md:inline">Accueil</span>
        </Link>

        <Link
          to="/cart"
          className="text-white hover:text-gray-400 flex items-center"
        >
          <FaShoppingCart className="mr-2 text-xl sm:text-xl" />
          <span className="hidden md:inline">Mon panier</span>
        </Link>

        <Link
          to="/categories"
          className="text-white hover:text-gray-400 flex items-center hidden md:flex"
        >
          <FaThList className="mr-2 text-xl sm:text-xl" />
          <span className="hidden md:inline">Catégories</span>
        </Link>

        <Link
          to="/login"
          className="text-white hover:text-gray-400 flex items-center hidden md:flex"
        >
          <FaSignInAlt className="mr-2 text-xl sm:text-xl" />
          <span className="hidden md:inline">Me connecter</span>
        </Link>

        <Link
          to="/profile"
          className="text-white hover:text-gray-400 flex items-center hidden md:flex"
        >
          <FaUser className="mr-2 text-xl sm:text-xl" />
          <span className="hidden md:inline">Mon compte</span>
        </Link>

        <Link
          to="/search"
          className="text-white hover:text-gray-400 flex items-center"
        >
          <FaSearch className="mr-2 text-xl sm:text-xl" />
          <span className="hidden md:inline">Recherche</span>
        </Link>

        <Link
          to="/menu"
          className="text-white hover:text-gray-400 flex items-center md:hidden"
        >
          <FaAlignJustify className="mr-2 text-xl sm:text-xl" />
        </Link>
      </nav>
    </header>
  );
}
