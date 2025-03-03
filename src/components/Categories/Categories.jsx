import { MOCK_Categories } from "../../mock/MOCKS_DATA";
import GridCategories from "./GridCategories";

const categoryData = MOCK_Categories;

export default function Categories() {
  return <GridCategories data={categoryData} />;
}
