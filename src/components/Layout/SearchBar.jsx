import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearSearch, setQuery } from "../../redux/slice/searchSlice";

const DEBOUNCE_DELAY = 300;

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Met à jour la recherche avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = inputValue.trim();

      if (trimmed !== "") {
        dispatch(setQuery(trimmed));

        // Ne redirige que si on n’est pas déjà sur la page de résultats
        if (location.pathname !== "/search") {
          navigate("/search");
        }
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [inputValue, dispatch, navigate, location]);

  // Réinitialise la recherche si on quitte la page /search
  useEffect(() => {
    if (location.pathname !== "/search") {
      setInputValue(""); // vide le champ visuel
      dispatch(clearSearch()); // vide le store Redux
    }
  }, [location.pathname, dispatch]);

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Rechercher un produit ou service..."
      className="hidden lg:block w-40 px-3 py-1 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Champ de recherche de produit"
    />
  );
}
