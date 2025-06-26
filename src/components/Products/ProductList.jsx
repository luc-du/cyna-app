import DataStatus from "@shared/DataStatus";
import NoResult from "@shared/NoResult";
import SearchBar from "@shared/SearchBar";
import {
  fetchProducts,
  resetToProductList,
  searchProducts,
} from "@slices/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Home/ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();

  const {
    list: products,
    loadingList,
    errorList,
    searchResults,
    loadingSearch,
    errorSearch,
    isSearchMode,
  } = useSelector((state) => state.products);

  // 1) Chargement initial (éviter la boucle infinie)
  useEffect(() => {
    if ((!products || products.length === 0) && !loadingList && !errorList) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length, loadingList, errorList, products]);

  // 2) Détermine quel tableau afficher
  const dataToDisplay = isSearchMode ? searchResults : products || [];

  // 3) handleSearch et handleClear
  const handleSearch = (term) => {
    dispatch(searchProducts({ keyword: term, page: 0, size: 100 }));
  };

  const handleClear = () => {
    dispatch(resetToProductList());

    // Recharger la liste si vide ou en erreur
    if (!products || products.length === 0 || errorList) {
      dispatch(fetchProducts());
    }
  };

  // 4) États de chargement et d'erreur
  const isLoading = isSearchMode ? loadingSearch : loadingList;
  const currentError = isSearchMode ? errorSearch : errorList;
  const emptyMessage = isSearchMode
    ? "Aucun produit trouvé pour cette recherche."
    : "Aucun produit disponible.";

  return (
    <main role="main" className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Catalogue des Produits
      </h1>

      {/* Barre de recherche générique */}
      <SearchBar
        onSearch={handleSearch}
        onClear={handleClear}
        placeholder="Rechercher un produit…"
        minLength={3}
      />

      {/* Status unifié */}
      <DataStatus
        loading={isLoading}
        error={currentError}
        dataLength={dataToDisplay.length}
        emptyMessage={emptyMessage}
      />

      {/* Affichage de la grille */}
      {!isLoading && dataToDisplay.length > 0 && (
        <ul
          role="list"
          aria-label={
            isSearchMode ? "Résultats de la recherche" : "Liste des produits"
          }
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
        >
          {dataToDisplay.map((product) => (
            <li key={product.id} role="listitem">
              <ProductCard
                product={product}
                disabled={!product.active}
                linkTo={product.active ? `/products/${product.id}` : null}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Message si pas de données */}
      {!isLoading && dataToDisplay.length === 0 && (
        <NoResult
          message="Aucun produit trouvé."
          role="status"
          aria-live="polite"
          aria-label="Aucun produit trouvé."
        />
      )}
    </main>
  );
};

export default ProductList;
