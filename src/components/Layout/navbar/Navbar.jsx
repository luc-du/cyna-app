// src/components/Navbar/Navbar.jsx

import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo-cyna-white.svg";
import SearchBar from "../SearchBar";
import CartBadge from "./CartBadge";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="w-full bg-primary text-white px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" aria-label="Accueil Cyna">
        <img src={logo} alt="Logo Cyna" className="w-40 sm:w-40" />
      </Link>

      {/* Desktop : liens + SearchBar */}
      <nav
        className="hidden lg:flex items-center space-x-4"
        aria-label="Navigation principale"
      >
        <NavbarLinks />
        <SearchBar />
      </nav>

      {/* Panier */}
      <div className="flex items-center space-x-4" aria-label="Panier">
        <CartBadge />
      </div>

      {/* Mobile : icône recherche redirige vers /search + menu burger */}
      <div className="lg:hidden flex items-center space-x-4">
        <button
          className="text-white text-xl p-2"
          onClick={() => navigate("/search")}
          aria-label="Ouvrir la recherche"
        >
          <FaSearch />
        </button>
        <MobileMenu />
      </div>
    </header>
  );
}
