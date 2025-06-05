import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, searchProducts } from "../../redux/slice/productSlice";
import ProductCard from "../Home/ProductCard";
import Pagination from "./Pagination";
import ProductSearch from "./ProductSearch";

const ProductList = () => {
  const dispatch = useDispatch();
  const [localPage, setLocalPage] = useState(1);

  const {
    list: products,
    searchResults,
    loadingList,
    loadingSearch,
    isSearchMode,
    errorList,
    currentPage,
    totalPages,
  } = useSelector((state) => state.products);

  const dataToDisplay = isSearchMode ? searchResults : products;

  const handlePageChange = (newPage) => {
    setLocalPage(newPage);
    if (isSearchMode) {
      dispatch(searchProducts({ keyword: "", page: newPage }));
    }
  };

  useEffect(() => {
    if (!isSearchMode) {
      dispatch(fetchProducts());
    }
  }, [dispatch, isSearchMode]);

  return (
    <main role="main" className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Catalogue des Produits
      </h1>

      <ProductSearch onPageChange={handlePageChange} />

      {(loadingList || loadingSearch) && (
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

      {!loadingList && dataToDisplay.length === 0 && !errorList && (
        <p className="text-center text-gray-600">Aucun produit trouvé.</p>
      )}

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

      {isSearchMode && totalPages > 1 && (
        <Pagination
          localPage={localPage}
          setLocalPage={setLocalPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
};

export default ProductList;
