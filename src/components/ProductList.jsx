// src/components/ProductList/ProductList.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slice/productSlice";
import ProductCard from "./Home/ProductCard";

/**
 * ProductList
 *
 * Ce composant affiche la liste complète des produits, en se basant
 * sur l’état Redux (fetchProducts). En cas d’échec, il tombe en
 * fallback sur les mocks (MOCK_TOP_PRODUCTS).
 *
 * Accessibilité :
 * - role="main" sur le conteneur racine.
 * - role="status" pour le message de chargement.
 * - role="alert" pour les messages d’erreur.
 * - role="list" / role="listitem" pour la grille de produits.
 */
const ProductList = () => {
  const dispatch = useDispatch();

  // On récupère la liste, le statut de chargement et l’erreur éventuelle
  const {
    list: products,
    loadingList,
    errorList,
  } = useSelector((state) => state.products);

  // Au montage, on déclenche la récupération des produits
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main role="main" className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Catalogue des Produits
      </h1>

      {loadingList && (
        <p
          role="status"
          aria-live="polite"
          className="text-center text-gray-600"
        >
          Chargement des produits...
        </p>
      )}

      {errorList && (
        <p role="alert" className="text-center text-red-500 mb-4">
          {errorList}
        </p>
      )}

      {/* Si la liste est vide et qu’on n’est plus en chargement, on affiche un message */}
      {!loadingList && products.length === 0 && !errorList && (
        <p className="text-center text-gray-600">
          Aucun produit disponible pour le moment.
        </p>
      )}

      {/* Affichage de la grille de produits */}
      {products.length > 0 && (
        <ul
          role="list"
          aria-label="Liste des produits"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
        >
          {products.map((product) => (
            <li
              key={product.id}
              role="listitem"
              aria-label={`Produit: ${product.name}`}
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ProductList;
