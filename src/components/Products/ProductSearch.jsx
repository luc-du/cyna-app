import { fetchProducts, searchProducts } from "@slices/productSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (query.length === 0) {
      dispatch(fetchProducts());
    } else if (query.length >= 3) {
      dispatch(searchProducts({ keyword: query }));
    }
  }, [query, dispatch]);

  const handleReset = () => {
    setQuery("");
    dispatch(fetchProducts());
  };

  return (
    <div className="mb-6 flex justify-center gap-2">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 py-2 rounded w-64"
      />
      <button
        onClick={handleReset}
        className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        Réinitialiser
      </button>
    </div>
  );
};

export default ProductSearch;
