import { fetchProducts, searchProducts } from "@slices/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Home/ProductCard";
import Pagination from "./Pagination";
import ProductSearch from "./ProductSearch";

const ProductList = () => {
  const dispatch = useDispatch();

  // ─── On gère un state local pour la query + la page souhaitée ───
  const [query, setQuery] = useState("");
  const [localPage, setLocalPage] = useState(1);

  // ─── On lit tout depuis le slice `products` ───────────────────────
  const {
    list: products,
    searchResults,
    loadingList,
    loadingSearch,
    isSearchMode,
    errorList,
    errorSearch,
    currentPage,
    totalPages,
  } = useSelector((state) => state.products);

  // On choisit quel tableau afficher
  const dataToDisplay = isSearchMode ? searchResults : products;

  // ─── Effet principal : chaque fois que `query` ou `localPage` change, on déclenche l’API adaptée ───
  useEffect(() => {
    // Si on est en “mode recherche” (keyword ≥ 3 caractères)
    if (query.length >= 3) {
      // On déclenche la recherche sur la page (localPage - 1) 0-based
      dispatch(
        searchProducts({ keyword: query, page: localPage - 1, size: 6 })
      );
    } else {
      // Si query < 3, on revient en “mode catalogue” (tous les produits), page 0-based = localPage-1
      dispatch(fetchProducts({ page: localPage - 1, size: 12 }));
    }
  }, [dispatch, query, localPage]);

  // ─── Gestion du changement de page (numérotation 1-based côté UI) ───
  const handlePageChange = (newPage) => {
    setLocalPage(newPage);
  };

  return (
    <main role="main" className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Catalogue des Produits
      </h1>

      {/* ─── Champ de recherche ────────────────────────────────────────── */}
      <ProductSearch query={query} setQuery={setQuery} />

      {/* ─── Affichage du loader (liste ou recherche) ──────────────────── */}
      {(loadingList || loadingSearch) && (
        <p
          role="status"
          aria-live="polite"
          className="text-center text-gray-600"
        >
          Chargement des produits...
        </p>
      )}

      {/* ─── Affichage des erreurs (liste ou recherche) ────────────────── */}
      {errorList && !isSearchMode && (
        <p role="alert" className="text-center text-red-500 mb-4">
          {errorList}
        </p>
      )}
      {errorSearch && isSearchMode && (
        <p role="alert" className="text-center text-red-500 mb-4">
          {errorSearch}
        </p>
      )}

      {/* ─── “Aucun produit trouvé” si data vide et pas d’erreur ───────── */}
      {!loadingList &&
        !loadingSearch &&
        dataToDisplay.length === 0 &&
        !errorList &&
        !errorSearch && (
          <p className="text-center text-gray-600">Aucun produit trouvé.</p>
        )}

      {/* ─── Liste de produits (cartes) ────────────────────────────────── */}
      {dataToDisplay.length > 0 && (
        <ul
          role="list"
          aria-label="Liste des produits"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
        >
          {dataToDisplay.map((product) => (
            <li key={product.id} role="listitem">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {/* ─── Pagination si plusieurs pages ─────────────────────────────── */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
};

export default ProductList;
