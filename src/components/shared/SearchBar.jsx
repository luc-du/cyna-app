import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

/**
 * SearchBar réutilisable :
 * - on appelle onSearch(keyword) quand l'utilisateur soumet avec length >= minLength
 * - on appelle onClear() quand l'utilisateur efface complètement le champ (passage non vide → vide)
 */
const SearchBar = ({
  onSearch,
  onClear,
  placeholder = "Rechercher …",
  minLength = 3,
}) => {
  const [term, setTerm] = useState("");

  // Ref pour mémoriser la valeur précédente de term
  const prevTermRef = useRef(term);

  useEffect(() => {
    // Si on passe de prevTerm !== "" à term === "", c'est que l'utilisateur a vidé le champ
    if (prevTermRef.current !== "" && term.trim() === "") {
      onClear();
    }
    prevTermRef.current = term;
  }, [term, onClear]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (trimmed.length >= minLength) {
      onSearch(trimmed);
    }
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3 "
      aria-label="Formulaire de recherche"
    >
      <label htmlFor="search-input" className="sr-only">
        {placeholder}
      </label>

      <input
        id="search-input"
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        aria-required="true"
        aria-label={placeholder}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        aria-label="Lancer la recherche"
      >
        Rechercher
        <span className="sr-only">
          {term.trim()
            ? "Effacer le champ de recherche"
            : "Lancer la recherche"}
        </span>
      </button>
    </form>
  );
};

export default SearchBar;
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  minLength: PropTypes.number,
};
