import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slice/categorySlice";
import CategorySearch from "../Categories/CategorySearch";
import GridCategories from "../Categories/GridCategories";

/**
 * Page principale des catégories.
 * - Affichage initial (BE ou mock)
 * - Affichage dynamique selon la recherche
 * - Réaffichage automatique si input vidé
 */
export default function Categories() {
  const dispatch = useDispatch();
  const { list, loading, error, searchResults } = useSelector(
    (state) => state.categories
  );

  // Évite plusieurs dispatch au montage
  const hasFetchedOnce = useRef(false);

  useEffect(() => {
    if (!hasFetchedOnce.current) {
      hasFetchedOnce.current = true;
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  // Détermine quelle data afficher
  let dataToDisplay = [];
  let isSearchMode = false;

  // Si searchResults existe et n'est pas vide, on est en mode recherche
  if (Array.isArray(searchResults) && searchResults.length > 0) {
    dataToDisplay = searchResults;
    isSearchMode = true;
  }
  // Si searchResults est un tableau vide, on est en mode recherche sans résultats
  else if (Array.isArray(searchResults) && searchResults.length === 0) {
    dataToDisplay = [];
    isSearchMode = true;
  }
  // Sinon, on affiche la liste principale (list contient déjà le fallback mock si nécessaire)
  else {
    dataToDisplay = list || [];
    isSearchMode = false;
  }

  // Rendu conditionnel
  return (
    <main role="main" className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Catégories</h1>

      {/* Barre de recherche */}
      <CategorySearch />

      {/* Affichage conditionnel */}
      {loading ? (
        <p className="text-center mt-10">Chargement des catégories…</p>
      ) : error && !Array.isArray(list) ? (
        <p className="text-center mt-10 text-red-500">
          Erreur de récupération : {error}
        </p>
      ) : dataToDisplay.length > 0 ? (
        <GridCategories data={dataToDisplay} />
      ) : isSearchMode ? (
        <p className="text-center mt-10 text-gray-500">
          Aucune catégorie ne correspond à votre recherche.
        </p>
      ) : (
        <p className="text-center mt-10 text-gray-500">
          Aucune catégorie à afficher.
        </p>
      )}
    </main>
  );
}
