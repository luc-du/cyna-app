import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearSearchResults,
  searchCategories,
} from "../../redux/slice/categorySlice";

const CategorySearch = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  // Lorsqu'on vide le champ → reset complet
  useEffect(() => {
    if (term.trim().length === 0) {
      dispatch(clearSearchResults()); // vide le searchResults pour revenir à la liste principale
      // ❌ Ne plus appeler fetchCategories() ici car déjà fait au montage
    }
  }, [term, dispatch]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmed = term.trim();
    if (trimmed.length >= 3) {
      dispatch(searchCategories(trimmed));
    }
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
        aria-label="Champ de recherche catégorie"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        aria-label="Lancer la recherche"
      >
        Rechercher
      </button>
    </form>
  );
};

export default CategorySearch;
