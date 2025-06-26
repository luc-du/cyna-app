import CTAButton from "@shared/buttons/CTAButton";
import PaginationControls from "@shared/PaginationControls";
import { fetchCategories } from "@slices/categorySlice";
import { clearSearch, searchProducts, setQuery } from "@slices/searchSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Home/ProductCard";
import EmptyState from "../ui/EmptyState";
import Loader from "../ui/Loader";
import AvailabilityToggle from "./AvailabilityToggle";
import FilterCheckboxes from "./FilterCheckboxes";
import PriceSlider from "./PriceSlider";
import SortSelect from "./SortSelect";

/**
 * Page de recherche avec filtres dynamiques et tri local.
 * - Applique une pagination frontend
 * - Contourne l'absence de filtres côté backend (catégories, features, disponibilité)
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

  // Récupère les catégories au premier render
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Synchronise l'input local avec la query Redux
  useEffect(() => {
    setLocalInput(query);
  }, [query]);

  // Recherche avec debounce 300ms
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
            minPrice,
            maxPrice,
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

  /**
   * Applique les filtres, le tri et la pagination en local.
   */
  const finalResults = useMemo(() => {
    if (!searchResults) return [];

    let results = [...searchResults];

    if (selectedFeatures.length > 0) {
      results = results.filter((product) => {
        if (!product.caracteristics) return false;
        const productFeatures = product.caracteristics
          .toLowerCase()
          .split(",")
          .map((f) => f.trim());
        return selectedFeatures.some((feature) =>
          productFeatures.includes(feature)
        );
      });
    }

    if (selectedCategoriesIds.length > 0) {
      results = results.filter((product) =>
        selectedCategoriesIds.includes(product.category?.id)
      );
    }

    if (availableOnly) {
      results = results.filter((product) => product.active === true);
    }

    results.sort((a, b) => {
      switch (sort) {
        case "priceAsc":
          return a.amount - b.amount;
        case "priceDesc":
          return b.amount - a.amount;
        default:
          return 0;
      }
    });

    const offset = Math.max(0, (currentPage - 1) * pageSize);

    return results.slice(offset, offset + pageSize);
  }, [
    searchResults,
    selectedFeatures,
    selectedCategoriesIds,
    availableOnly,
    sort,
    currentPage,
    pageSize,
  ]);

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

  return (
    <div
      className="container mx-auto px-4 lg:px-6 py-8 flex flex-col lg:flex-row"
      role="region"
      aria-labelledby="search-results-heading"
    >
      {/* Filtres */}
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
          className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white focus:outline-none"
          label="Réinitialiser tous les filtres"
        />
      </aside>

      {/* Résultats */}
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
              className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white focus:outline-none"
              label="Réinitialiser la recherche"
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
            {finalResults.length === 0 && !error ? (
              <div className="flex items-center justify-center h-40">
                <EmptyState message="Aucun produit ne correspond à votre recherche." />
              </div>
            ) : (
              <section className="mb-6 w-full">
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  aria-label="Liste des produits"
                >
                  {finalResults.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      linkTo={`/products/${product.id}`}
                    />
                  ))}
                </div>

                <PaginationControls
                  currentPage={currentPage}
                  totalPages={Math.ceil(searchResults.length / pageSize)}
                />
              </section>
            )}
          </>
        )}
      </section>
    </div>
  );
}
