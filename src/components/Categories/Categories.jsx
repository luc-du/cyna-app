// src/components/Pages/Categories.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slice/categorySlice";
import CategorySearch from "./CategorySearch";
import GridCategories from "./GridCategories";

export default function Categories() {
  const dispatch = useDispatch();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    searchResults,
  } = useSelector((state) => state.categories);

  // Au montage, on charge toutes les catégories si ce n’est pas déjà fait
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  if (categoriesLoading) {
    return <p className="text-center my-10">Chargement des catégories…</p>;
  }
  if (categoriesError) {
    return (
      <p className="text-center my-10 text-red-500">
        Erreur lors de la récupération : {categoriesError}
      </p>
    );
  }

  // Si la recherche retourne au moins un élément, on affiche searchResults
  // Sinon, on affiche toutes les catégories
  const dataToDisplay =
    Array.isArray(searchResults) && searchResults.length > 0
      ? searchResults
      : categories || [];

  return (
    <main role="main" className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Catégories</h1>

      {/* Composant de recherche */}
      <CategorySearch />

      {/* Grille de cartes de catégories */}
      <GridCategories data={dataToDisplay} />
    </main>
  );
}
