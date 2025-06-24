import { logout } from "@slices/authSlice";
import {
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaThList,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavbarLinks() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="flex items-center justify-around flex-wrap gap-2 lg:gap-4">
      <Link to="/" className="navBarLink">
        <FaHome className="navBarLinkIcon" />
        <span className="hidden lg:inline">Accueil</span>
      </Link>

      <Link to="/categories" className="navBarLink">
        <FaThList className="navBarLinkIcon" />
        <span className="hidden lg:inline">Catégories</span>
      </Link>

      {isLogged ? (
        <>
          <Link
            onClick={() => dispatch(logout())}
            className="navBarLink"
            to="#"
          >
            <FaSignOutAlt className="navBarLinkIcon" />
            <span className="hidden lg:inline">Se déconnecter</span>
          </Link>
          <Link to="/profile" className="navBarLink">
            <FaUser className="navBarLinkIcon" />
            <span className="hidden lg:inline">Mon compte</span>
          </Link>
        </>
      ) : (
        <Link to="/login" className="navBarLink">
          <FaSignInAlt className="navBarLinkIcon" />
          <span className="hidden lg:inline">Me connecter</span>
        </Link>
      )}
    </div>
  );
}
