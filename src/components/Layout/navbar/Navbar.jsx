import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo-cyna-white.svg";
import SearchBar from "../SearchBar";
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
      <nav className="hidden lg:flex items-center space-x-4">
        <NavbarLinks />
        <SearchBar />
      </nav>

      {/* Cart Badge */}
      <div className="flex items-center space-x-4">
        <CartBadge />
      </div>

      {/* Tablet/Mobile Navigation */}
      <div className="lg:hidden flex items-center space-x-4">
        <Link to="/search" className="text-white text-xl p-2">
          <FaSearch />
        </Link>
        <MobileMenu />
      </div>
    </>
  );
}
