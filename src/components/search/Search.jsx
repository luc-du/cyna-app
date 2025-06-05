import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slice/categorySlice";
import {
  clearSearch,
  searchProducts,
  setQuery,
} from "../../redux/slice/searchSlice";
import ProductCard from "../Home/ProductCard";
import EmptyState from "../ui/EmptyState";
import Loader from "../ui/Loader";
import AvailabilityToggle from "./AvailabilityToggle";
import FilterCheckboxes from "./FilterCheckboxes";
import PriceSlider from "./PriceSlider";
import SortSelect from "./SortSelect";

export default function SearchPage() {
  const dispatch = useDispatch();

  // --- Redux state slices ---
  const { query, searchResults, loading, error, currentPage, pageSize } =
    useSelector((state) => state.search);
  const { list: categoriesList } = useSelector((state) => state.categories);

  // --- Local state pour facettes & tri ---
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState("priceAsc");

  // --- Local state pour l’input in-page (synchronisé avec query) ---
  const [localInput, setLocalInput] = useState(query);

  // Ref pour donner le focus à l’input in-page
  const inPageInputRef = useRef(null);

  // --- Charger les catégories dès le montage ---
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // --- Quand le Redux `query` change (par exemple via la SearchBar Navbar),
  //     on met à jour `localInput` pour refléter la même valeur.
  useEffect(() => {
    setLocalInput(query);
  }, [query]);

  // --- Debounce pour l’input in-page ---
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = localInput.trim();

      if (trimmed !== "") {
        // 1) Mettre à jour query dans Redux
        dispatch(setQuery(trimmed));

        // 2) Lancer la recherche avec tous les filtres/tri
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
        // Si l’input est vide, on clear le store
        dispatch(clearSearch());
      }
    }, 300 /* ms */);

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

  // --- Focus automatique sur l’input in-page au montage ---
  useEffect(() => {
    if (inPageInputRef.current) {
      inPageInputRef.current.focus();
    }
  }, []);

  // --- Réinitialiser tout (query + facettes + tri + localInput) ---
  const handleResetAll = () => {
    dispatch(clearSearch());
    setSelectedCategoriesIds([]);
    setSelectedFeatures([]);
    setMinPrice(0);
    setMaxPrice(1000);
    setAvailableOnly(false);
    setSort("priceAsc");
    setLocalInput("");
    // Après ce clear, l’useEffect ci-dessus appellera clearSearch() à nouveau, mais ce n’est pas gênant.
  };

  return (
    <main
      className="container mx-auto px-4 lg:px-6 py-8 flex flex-col lg:flex-row"
      aria-labelledby="search-results-heading"
    >
      {/* ========================================= */}
      {/* ========== Panneau des filtres ========== */}
      {/* ========================================= */}
      <aside className="w-full lg:w-1/4 mb-8 lg:mb-0 lg:pr-6">
        <h3 className="text-xl font-semibold mb-4">Filtres</h3>

        {/* Filtre : Catégories */}
        <FilterCheckboxes
          title="Catégories"
          options={categoriesList}
          selected={selectedCategoriesIds}
          onChange={setSelectedCategoriesIds}
        />

        {/* Filtre : Caractéristiques techniques */}
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

        {/* Filtre : Prix min / max */}
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

        {/* Filtre : Disponibilité */}
        <AvailabilityToggle
          label="Services disponibles uniquement"
          checked={availableOnly}
          onChange={setAvailableOnly}
        />

        {/* Bouton Réinitialiser tous les filtres */}
        <button
          onClick={handleResetAll}
          className="mt-6 text-sm text-primary hover:underline focus:outline-none"
        >
          Réinitialiser tous les filtres
        </button>
      </aside>

      {/* ========================================= */}
      {/* ============== Contenu principal ========= */}
      {/* ========================================= */}
      <section className="w-full lg:w-3/4">
        {/* ====== Champ de recherche in-page ====== */}
        <div className="mb-6">
          <input
            type="text"
            ref={inPageInputRef}
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="Rechercher un produit ou service…"
            className="w-full lg:w-3/4 px-4 py-2 border rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Rechercher un produit ou service"
          />
        </div>

        {/* ====== Titre + bouton Réinitialiser rapide ====== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <h2
            id="search-results-heading"
            className="text-2xl font-bold text-primary mb-2 sm:mb-0"
            tabIndex={-1}
          >
            {query.trim() === ""
              ? "Recherche"
              : `Résultats pour : « ${query} »`}
          </h2>
          {query.trim() !== "" && (
            <button
              onClick={handleResetAll}
              className="text-sm text-primary hover:underline focus:outline-none ml-0 sm:ml-4"
            >
              Réinitialiser la recherche
            </button>
          )}
        </div>

        {/* ====== Contenu selon état ====== */}
        {query.trim() === "" ? (
          // Message d’invitation centré
          <div className="flex items-center justify-center h-40 text-gray-600">
            Tapez un mot-clé (ex. : “EDR”, “SOC Premium”, “XDR”) pour lancer la
            recherche.
          </div>
        ) : loading ? (
          // Loader centré
          <div className="flex items-center justify-center h-40">
            <Loader aria-label="Chargement des résultats" />
          </div>
        ) : (
          <>
            {/* Bannière d’erreur / fallback */}
            {error && (
              <div
                className="text-center mb-4 text-yellow-600"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </div>
            )}

            {/* Select “Trier par” aligné à droite */}
            <div className="flex justify-end mb-4">
              <SortSelect sort={sort} onChange={setSort} />
            </div>

            {/* Aucun résultat et pas d’erreur → EmptyState */}
            {searchResults.length === 0 && !error ? (
              <div className="flex items-center justify-center h-40">
                <EmptyState message="Aucun produit ne correspond à votre recherche." />
              </div>
            ) : (
              // Grille des produits
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
    </main>
  );
}
