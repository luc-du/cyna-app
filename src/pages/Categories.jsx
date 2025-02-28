import GridCategories from "../components/Categories/GridCategories";
import { MOCK_Categories } from "../mock/MOCKS_DATA";

const categoryData = MOCK_Categories;

export default function Categories() {
  return <GridCategories data={categoryData} />;
}
