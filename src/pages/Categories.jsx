import { Outlet } from "react-router-dom";
import Category from "../components/Category";
import Grid from "../components/Grid";
import { MOCK_Categories } from "../mock/MOCK_Categories";

const categoryData = MOCK_Categories;

export default function Categories() {
  return (
    <div>
      <Grid
        title={"Catégories des produits"}
        items={categoryData}
        renderItem={(item) => (
          <Category
            key={item.id}
            name={item.name}
            url={item.url}
            imageUrl={item.imageUrl}
            products={item.products}
          />
        )}
      />
      <Outlet />
    </div>
  );
}
