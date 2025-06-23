import { clearSearch, searchProducts, setQuery } from "@slices/searchSlice";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

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
        dispatch(searchProducts({ keyword: trimmed, page: 0, size: 6 }));
        if (location.pathname !== "/search") {
          navigate("/search");
        }
      }
      if (trimmed === "") {
        dispatch(clearSearch());
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [inputValue, dispatch, navigate, location]);

  // Réinitialise la recherche si on quitte /search
  useEffect(() => {
    if (location.pathname !== "/search") {
      setInputValue("");
      dispatch(clearSearch());
    }
  }, [location.pathname, dispatch]);

  // effacer en un clic
  const handleClear = () => {
    setInputValue("");
    dispatch(clearSearch());
  };

  return (
    <div className="relative w-full max-w-xs min-w-0 lg:flex-shrink-0">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Rechercher..."
        className="w-full px-3 py-1 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        aria-label="Champ de recherche de produit"
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-700 focus:outline-none"
          aria-label="Effacer la recherche"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}

//📌en darkmode soucis de visibilité du texte dans input
