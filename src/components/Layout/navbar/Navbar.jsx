import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo-cyna-white.svg";
import CartBadge from "./CartBadge";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  return (
    <>
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Cyna Logo" className="w-40 sm:w-40" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-4">
        <NavbarLinks />
      </nav>

      {/* Cart Badge */}
      <CartBadge />

      {/* Tablet/Mobile Navigation */}
      <div className="lg:hidden flex items-center">
        <Link to="/search" className="text-white text-xl p-2">
          <FaSearch />
        </Link>
        <MobileMenu />
      </div>
    </>
  );
}
