import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slice/categorySlice";
import GridCategories from "./GridCategories";

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  if (loading) return <p>Chargement...</p>;
  if (error) console.warn(error);

  return <GridCategories data={categories} />;
}
