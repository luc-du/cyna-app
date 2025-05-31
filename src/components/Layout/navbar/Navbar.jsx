import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo-cyna-white.svg";
import { setQuery } from "../../../redux/slice/searchSlice";
import SearchBar from "../SearchBar";
import CartBadge from "./CartBadge";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";

/**
 * Composant Navbar
 *
 * Affiche la barre de navigation principale de l'application, incluant :
 * - Le logo de l'application
 * - Les liens de navigation pour la version desktop
 * - Une barre de recherche (desktop et mobile)
 * - Un badge de panier
 * - Un menu mobile avec overlay de recherche
 *
 * Fonctionnalités :
 * - Permet la recherche de produits ou services via une barre de recherche.
 * - Affiche un overlay de recherche optimisé pour mobile.
 * - Gère la navigation vers la page de résultats de recherche.
 * - Utilise Redux pour dispatcher la requête de recherche.
 *
 * @component
 * @returns {JSX.Element} Élément JSX représentant la barre de navigation.
 */
export default function Navbar() {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [mobileInput, setMobileInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setMobileInput(value);
    dispatch(setQuery(value.trim()));
    if (value.trim() !== "") navigate("/search");
  };

  const closeOverlay = () => {
    setMobileInput("");
    setShowSearchOverlay(false);
  };

  return (
    <>
      {/* Logo */}
      <Link to="/" className="flex-shrink-0" aria-label="Accueil Cyna">
        <img src={logo} alt="Cyna Logo" className="w-40 sm:w-40" />
      </Link>

      {/* Desktop Navigation */}
      <nav
        className="hidden lg:flex items-center space-x-4"
        aria-label="Navigation principale"
      >
        <NavbarLinks />
        <SearchBar />
      </nav>

      {/* Cart Badge */}
      <div className="flex items-center space-x-4" aria-label="Panier">
        <CartBadge />
      </div>

      {/* Mobile Navigation */}
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

      {/* Overlay de recherche mobile */}
      {showSearchOverlay && (
        <div
          id="mobile-search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Recherche mobile"
          className="fixed inset-0 z-50 bg-white/70 backdrop-blur-md flex flex-col justify-center items-center px-6"
        >
          <style>{`body { overflow: hidden; }`}</style>

          <button
            onClick={closeOverlay}
            className="absolute top-6 right-4 text-primary text-3xl p-2 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Fermer la recherche"
          >
            <FaTimes />
          </button>

          <div className="w-full max-w-md">
            <label htmlFor="mobile-search-input" className="sr-only">
              Rechercher un produit ou service
            </label>
            <input
              id="mobile-search-input"
              type="text"
              value={mobileInput}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Rechercher un produit ou service..."
              className="w-full px-5 py-3 border border-gray-300 rounded-xl text-lg text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
              role="searchbox"
              aria-label="Rechercher un produit ou service"
            />
          </div>
        </div>
      )}
    </>
  );
}
