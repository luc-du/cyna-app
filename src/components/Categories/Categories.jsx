import DataStatus from "@shared/DataStatus";
import NoResult from "@shared/NoResult";
import SearchBar from "@shared/SearchBar";
import {
  clearSearchResults,
  fetchCategories,
  searchCategories,
} from "@slices/categorySlice";
import { emptyBox } from "@utils/indexImages";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const dataToDisplay = isSearchMode ? searchResults : list || [];

  return (
    <div role="region" className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Catégories</h1>

      {/* Barre de recherche */}
      <SearchBar
        onSearch={(keyword) => {
          dispatch(searchCategories(keyword));
        }}
        onClear={() => {
          dispatch(clearSearchResults());
        }}
        placeholder="Rechercher une catégorie…"
        minLength={3}
        aria-label="Champ de recherche catégorie"
        className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3"
        aria-required="true"
      />

      {/* Loader ou message d'erreur via DataStatus */}
      <DataStatus
        loading={loading}
        error={error}
        dataLength={1 /* !=0 pour ne pas déclencher l'empty ici */}
        emptyMessage=""
        aria-label="Statut des données des catégories"
      />

      {/* Rendu conditionnel : 
          - Si chargement ou erreur (avec pas de données), DataStatus a déjà affiché un Loader ou un <p> d’erreur. 
          - Sinon, j' affiche la grille, NoResult ou message vide. */}
      {!loading && !error && (
        <div role="region" className="w-full max-w-4xl mx-auto p-6">
          {dataToDisplay.length > 0 ? (
            <GridCategories data={dataToDisplay} />
          ) : isSearchMode ? (
            <NoResult
              message="Aucun résultat trouvé pour cette recherche."
              image={emptyBox}
            />
          ) : (
            <p className="text-center mt-10 text-gray-500">
              Aucune catégorie à afficher.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
