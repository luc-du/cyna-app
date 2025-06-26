import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logoCynaWhite } from "@utils/indexImages";
import SearchBar from "../SearchBar";
import CartBadge from "./CartBadge";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between px-4 py-2">
      {/* Logo */}
      <Link to="/" aria-label="Accueil Cyna" className="shrink-0">
        <img
          src={logoCynaWhite}
          alt="Logo Cyna"
          className="w-32 sm:w-36 md:w-40"
        />
      </Link>

      {/* Desktop */}
      <div className="hidden lg:flex flex-1 items-center justify-between gap-6 pl-8">
        {" "}
        {/* Liens + search */}
        <NavbarLinks />
        <div className="flex items-center gap-3">
          <div className="max-w-[180px] w-full">
            <SearchBar />
          </div>
          <CartBadge />
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex items-center space-x-3 ml-auto z-50">
        <button
          onClick={() => navigate("/search")}
          className="text-white text-xl p-2"
          aria-label="Ouvrir la recherche"
        >
          <FaSearch />
        </button>
        <CartBadge />
        <MobileMenu />
      </div>
    </div>
  );
}
