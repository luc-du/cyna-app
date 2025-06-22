import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slice/categorySlice";
import {
  clearSearch,
  searchProducts,
  setQuery,
} from "../../redux/slice/searchSlice";
import ProductCard from "../Home/ProductCard";
import CTAButton from "../shared/buttons/CTAButton";
import EmptyState from "../ui/EmptyState";
import Loader from "../ui/Loader";
import AvailabilityToggle from "./AvailabilityToggle";
import FilterCheckboxes from "./FilterCheckboxes";
import PriceSlider from "./PriceSlider";
import SortSelect from "./SortSelect";

/**
 * Attention développeur :
 * - Le champ `amount` en BDD est en centimes → les valeurs min/max doivent être multipliées par 100.
 * - Le champ `caracteristics` est rempli depuis peu → le filtrage des "features" est fait **en frontend**, localement.
 */

export default function SearchPage() {
  const dispatch = useDispatch();

  const { query, searchResults, loading, error, currentPage, pageSize } =
    useSelector((state) => state.search);
  const { list: categoriesList } = useSelector((state) => state.categories);

  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState("priceAsc");
  const [localInput, setLocalInput] = useState(query);
  const inPageInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setLocalInput(query);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = localInput.trim();
      if (trimmed !== "") {
        dispatch(setQuery(trimmed));
        dispatch(
          searchProducts({
            keyword: trimmed,
            page: currentPage,
            size: pageSize,
            categoriesIds: selectedCategoriesIds,
            features: selectedFeatures,
            minPrice: minPrice * 100, // conversion euros → centimes
            maxPrice: maxPrice * 100,
            availableOnly,
            sort,
          })
        );
      } else {
        dispatch(clearSearch());
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [
    localInput,
    dispatch,
    currentPage,
    pageSize,
    selectedCategoriesIds,
    selectedFeatures,
    minPrice,
    maxPrice,
    availableOnly,
    sort,
  ]);

  useEffect(() => {
    if (inPageInputRef.current) {
      inPageInputRef.current.focus();
    }
  }, []);

  const handleResetAll = () => {
    dispatch(clearSearch());
    setSelectedCategoriesIds([]);
    setSelectedFeatures([]);
    setMinPrice(0);
    setMaxPrice(1000);
    setAvailableOnly(false);
    setSort("priceAsc");
    setLocalInput("");
  };

  // 🔎 Filtrage local des caractéristiques techniques
  const filteredResults = useMemo(() => {
    if (!searchResults || selectedFeatures.length === 0) return searchResults;

    return searchResults.filter((product) => {
      if (!product.caracteristics) return false;

      const productFeatures = product.caracteristics
        .toLowerCase()
        .split(",")
        .map((f) => f.trim());

      return selectedFeatures.some((feature) =>
        productFeatures.includes(feature)
      );
    });
  }, [searchResults, selectedFeatures]);

  return (
    <div
      className="container mx-auto px-4 lg:px-6 py-8 flex flex-col lg:flex-row"
      role="region"
      aria-labelledby="search-results-heading"
    >
      {/* Filtres latéraux */}
      <aside className="w-full lg:w-1/4 mb-8 lg:mb-0 lg:pr-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Filtres
        </h3>
        <FilterCheckboxes
          title="Catégories"
          options={categoriesList}
          selected={selectedCategoriesIds}
          onChange={setSelectedCategoriesIds}
        />
        <FilterCheckboxes
          title="Caractéristiques techniques"
          options={[
            { id: "cloud", name: "Cloud-native" },
            { id: "siem", name: "SIEM" },
            { id: "xdr", name: "XDR" },
            { id: "edr", name: "EDR" },
          ]}
          selected={selectedFeatures}
          onChange={setSelectedFeatures}
        />
        <PriceSlider
          label="Prix (min / max)"
          min={0}
          max={2000}
          value={[minPrice, maxPrice]}
          onChange={({ min, max }) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        />
        <AvailabilityToggle
          label="Services disponibles uniquement"
          checked={availableOnly}
          onChange={setAvailableOnly}
        />
        <CTAButton
          type="button"
          handleClick={handleResetAll}
          className="mt-6 text-sm text-primary hover:underline focus:outline-none dark:text-white"
          label={"Réinitialiser tous les filtres"}
        />
      </aside>

      {/* Résultats de recherche */}
      <section className="w-full lg:w-3/4">
        <div className="mb-6">
          <input
            type="text"
            ref={inPageInputRef}
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="Rechercher un produit ou service…"
            className="w-full lg:w-3/4 px-4 py-2 border rounded-md bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Rechercher un produit ou service"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h2
            id="search-results-heading"
            className="text-2xl font-bold text-primary dark:text-white mb-2 sm:mb-0"
            tabIndex={-1}
          >
            {query.trim() === ""
              ? "Recherche"
              : `Résultats pour : « ${query} »`}
          </h2>
          {query.trim() !== "" && (
            <CTAButton
              type="button"
              handleClick={handleResetAll}
              className="text-sm text-primary hover:underline focus:outline-none ml-0 sm:ml-4  dark:text-white"
              label={"Réinitialiser la recherche"}
            />
          )}
        </div>
        {query.trim() === "" ? (
          <div className="flex items-center justify-center h-40 text-gray-600 dark:text-gray-400">
            Tapez un mot-clé (ex. : “EDR”, “SOC Premium”, “XDR”) pour lancer la
            recherche.
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-40">
            <Loader aria-label="Chargement des résultats" />
          </div>
        ) : (
          <>
            {error && (
              <div
                className="text-center mb-4 text-yellow-600 dark:text-yellow-400"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </div>
            )}
            <div className="flex justify-end mb-4">
              <SortSelect sort={sort} onChange={setSort} />
            </div>
            {filteredResults.length === 0 && !error ? (
              <div className="flex items-center justify-center h-40">
                <EmptyState message="Aucun produit ne correspond à votre recherche." />
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                aria-label="Liste des produits"
              >
                {filteredResults.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    linkTo={`/products/${product.id}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
