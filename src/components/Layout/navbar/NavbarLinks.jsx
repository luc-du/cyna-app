import {
  FaHome,
  FaShoppingCart,
  FaSignInAlt,
  FaThList,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavbarLinks() {
  return (
    <>
      <Link to="/" className="text-white hover:text-gray-400 flex items-center">
        <FaHome className="mr-2 text-xl" />
        <span>Accueil</span>
      </Link>
      <Link
        to="/cart"
        className="text-white hover:text-gray-400 flex items-center"
      >
        <FaShoppingCart className="mr-2 text-xl" />
        <span>Mon panier</span>
      </Link>
      <Link
        to="/categories"
        className="text-white hover:text-gray-400 flex items-center"
      >
        <FaThList className="mr-2 text-xl" />
        <span>Catégories</span>
      </Link>
      <Link
        to="/login"
        className="text-white hover:text-gray-400 flex items-center"
      >
        <FaSignInAlt className="mr-2 text-xl" />
        <span>Me connecter</span>
      </Link>
      <Link
        to="/profile"
        className="text-white hover:text-gray-400 flex items-center"
      >
        <FaUser className="mr-2 text-xl" />
        <span>Mon compte</span>
      </Link>
    </>
  );
}
