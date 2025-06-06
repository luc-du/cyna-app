import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../src/components/ui/Loader";
import { fetchProducts } from "../../redux/slice/productSlice";
import ProductCard from "../Home/ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();

  const {
    list: products,
    loadingList,
    errorList,
  } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <main role="main" className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Catalogue des Produits
      </h1>

      {/* Loader */}
      {loadingList && (
        <Loader
          message={
            <p
              role="status"
              aria-live="polite"
              className="text-center text-gray-600"
            >
              Chargement des produits...
            </p>
          }
        />
      )}

      {/* Affichage d'une erreur si existante */}
      {errorList && (
        <p role="alert" className="text-center text-red-500 mb-4">
          {errorList}
        </p>
      )}

      {/* Si aucun produit après chargement et pas d'erreur */}
      {!loadingList && !errorList && products.length === 0 && (
        <p className="text-center text-gray-600">Aucun produit disponible.</p>
      )}

      {/* Affichage de la liste */}
      {products.length > 0 && (
        <ul
          role="list"
          aria-label="Liste des produits"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
        >
          {products.map((product) => (
            <li key={product.id} role="listitem">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ProductList;
