import {
  FaHome,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaThList,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/slice/authSlice";

export default function NavbarLinks() {
  // 1.State
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isAuthenticated);

  // 2.Functions
  // 3.Others

  // 4.Render
  return (
    <>
      <Link to="/" className="navBarLink">
        <FaHome className="navBarLinkIcon" />
        <span>Accueil</span>
      </Link>
      <Link to="/cart" className="navBarLink">
        <FaShoppingCart className="navBarLinkIcon" />
        <span>Mon panier</span>
      </Link>
      <Link to="/categories" className="navBarLink">
        <FaThList className="navBarLinkIcon" />
        <span>Catégories</span>
      </Link>
      {isLogged ? (
        <Link onClick={() => dispatch(logout())} className="navBarLink">
          <FaSignOutAlt className="navBarLinkIcon" />
          <span>Se déconnecter</span>
        </Link>
      ) : (
        <Link to="/login" className="navBarLink">
          <FaSignInAlt className="navBarLinkIcon" />
          <span>Me connecter</span>
        </Link>
      )}

      {isLogged && (
        <Link to="/profile" className="navBarLink">
          <FaUser className="navBarLinkIcon" />
          <span>Mon compte</span>
        </Link>
      )}
    </>
  );
}
