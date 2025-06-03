// src/pages/ProductPage.jsx

import ProductDetails from "../components/ProductDetail/ProductDetails";

/**
 * Présente la page détaillée d'un produit en fonction de l'ID passé dans l'URL.
 * Il s'agit d'un composant « route » qui encapsule ProductDetails.
 */
export default function ProductPage() {
  return <ProductDetails />;
}
