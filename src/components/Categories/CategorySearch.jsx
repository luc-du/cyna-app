// src/components/Pages/CategorySearch.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // clearSearchResults,
  fetchCategories,
  searchCategories,
} from "../../redux/slice/categorySlice";

/**
 * CategorySearch
 *
 * - Champ texte pour saisir un terme de recherche.
 * - Bouton “Rechercher” (si pas en recherche) ou “Réinitialiser” (si en recherche).
 * - “Rechercher” déclenche searchCategories(term) (client-side filtering).
 * - “Réinitialiser” vide le champ, appelle clearSearchResults() et re-débouche fetchCategories().
 *
 * Accessibilité :
 * - <form role="search"> + <input aria-label="Rechercher une catégorie">.
 * - Messages aria-live pour loading/error.
 */
const CategorySearch = () => {
  const dispatch = useDispatch();
  const { searchResults, searchLoading, searchError } = useSelector(
    (state) => state.categories
  );

  const [term, setTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    // Si searchResults contient des éléments, on passe isSearching = true
    if (Array.isArray(searchResults) && searchResults.length > 0) {
      setIsSearching(true);
    } else if (!searchLoading && searchResults.length === 0) {
      // Si on vient de vider searchResults, on repasse isSearching = false
      setIsSearching(false);
    }
  }, [searchResults, searchLoading]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (trimmed.length >= 1) {
      dispatch(searchCategories(trimmed));
    }
  };

  const handleReset = () => {
    setTerm("");
    dispatch(clearSearchResults());
    dispatch(fetchCategories());
    setIsSearching(false);
  };

  return (
    <form
      role="search"
      onSubmit={handleSearch}
      className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3"
      aria-label="Formulaire de recherche de catégories"
    >
      <label htmlFor="category-search-input" className="sr-only">
        Rechercher une catégorie
      </label>
      <input
        id="category-search-input"
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Rechercher une catégorie…"
        className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-required="true"
      />

      {!isSearching && (
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          aria-label="Lancer la recherche"
        >
          Rechercher
        </button>
      )}

      {isSearching && (
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          aria-label="Réinitialiser la recherche"
        >
          Réinitialiser
        </button>
      )}

      {searchLoading && (
        <p
          role="status"
          aria-live="polite"
          className="w-full text-center text-gray-600 mt-2"
        >
          Recherche en cours…
        </p>
      )}
      {searchError && (
        <p
          role="alert"
          aria-live="assertive"
          className="w-full text-center text-red-500 mt-2"
        >
          {searchError}
        </p>
      )}

      {!searchLoading &&
        !searchError &&
        isSearching &&
        Array.isArray(searchResults) &&
        searchResults.length === 0 && (
          <p className="w-full text-center text-gray-600 mt-2">
            Aucun résultat trouvé.
          </p>
        )}
    </form>
  );
};

export default CategorySearch;
