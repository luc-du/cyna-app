import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slice/productSlice";
import ProductCard from "../Home/ProductCard";
import DataStatus from "../shared/DataStatus";

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
      <DataStatus
        dataLength={products.length}
        loading={loadingList}
        emptyMessage="Aucun produit disponible."
        error={errorList}
      />

      {/* Affichage de la liste */}
      {products.length > 0 && (
        <ul
          role="list"
          aria-label="Liste des produits"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
        >
          {products.map((product) => (
            <li key={product.id} role="listitem">
              <ProductCard
                product={product}
                linkTo={`/products/${product.id}`}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ProductList;
