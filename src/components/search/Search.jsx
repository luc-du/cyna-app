import { useEffect, useRef, useState } from "react";
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

/* 📌🔩 À fixer suite maj repo les filtres avancés ne fonctionnent plus */

/**
 * Composant SearchPage
 * Permet à l'utilisateur de rechercher des produits/services avec filtres (facettes), tri, et pagination.
 * - Prise en charge du dark mode via les classes Tailwind conditionnelles
 * - Accessibilité ARIA et focus gérés
 * - Refonte de l’UX mobile (input focus auto, debounce, reset clair)
 * @component
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

  // Charge les catégories au montage
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Synchronise le champ local avec Redux query
  useEffect(() => {
    setLocalInput(query);
  }, [query]);

  // Debounce de l'input utilisateur
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
            {searchResults.length === 0 && !error ? (
              <div className="flex items-center justify-center h-40">
                <EmptyState message="Aucun produit ne correspond à votre recherche." />
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                aria-label="Liste des produits"
              >
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
