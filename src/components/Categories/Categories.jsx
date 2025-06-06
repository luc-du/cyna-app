import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slice/categorySlice";
import Loader from "../ui/Loader";
import CategorySearch from "./CategorySearch";
import GridCategories from "./GridCategories";

/**
 * Page principale des catégories.
 * - Affichage initial (BE ou mock)
 * - Affichage dynamique selon la recherche
 * - Réaffichage automatique si input vidé
 */
export default function Categories() {
  const dispatch = useDispatch();
  const { list, loading, error, searchResults, isSearchMode } = useSelector(
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

  if (isSearchMode) {
    // Mode recherche : afficher les résultats de recherche (même si vide)
    dataToDisplay = searchResults;
  } else {
    // Mode normal : afficher la liste principale (qui contient déjà le fallback mock)
    dataToDisplay = list || [];
  }

  {
    !loading && !error && dataToDisplay.length === 0 && (
      <p className="text-center text-gray-600 mt-4" role="status">
        Aucune catégorie disponible pour le moment.
      </p>
    );
  }

  {
    error && (
      <p className="text-center text-red-500 mt-4" role="alert">
        {error}
      </p>
    );
  }

  // Rendu conditionnel
  return (
    <main role="main" className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Catégories</h1>

      {/* Barre de recherche */}
      <CategorySearch />

      {/* Affichage conditionnel */}
      {loading ? (
        <>
          <Loader aria-label="Chargement des résultats" />
          <p className="text-center mt-10">Chargement des catégories…</p>
        </>
      ) : error && !list.length ? (
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
