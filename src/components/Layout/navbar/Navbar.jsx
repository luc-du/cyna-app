import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo-cyna-white.svg";
import SearchBar from "../SearchBar";
import CartBadge from "./CartBadge";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";

export default function Navbar() {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  const closeOverlay = () => {
    setShowSearchOverlay(false);
  };

  return (
    <div className=" w-full bg-primary text-white px-4 py-2 flex items-center justify-between">
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

      {/* Mobile : icône recherche + menu burger */}
      <div className="lg:hidden flex items-center space-x-4">
        <button
          className="text-white text-xl p-2"
          onClick={() => setShowSearchOverlay(true)}
          aria-label="Ouvrir la recherche"
          aria-haspopup="dialog"
          aria-controls="mobile-search-overlay"
        >
          <FaSearch />
        </button>
        <MobileMenu />
      </div>

      {/* Overlay recherche mobile */}
      {showSearchOverlay && (
        <div
          id="mobile-search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Recherche mobile"
          className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col justify-center items-center px-6"
        >
          <style>{`body { overflow: hidden; }`}</style>
          <button
            onClick={closeOverlay}
            className="absolute top-6 right-4 text-primary text-3xl p-2 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Fermer la recherche"
          >
            <FaTimes />
          </button>
          <SearchBar />
        </div>
      )}
    </div>
  );
}
