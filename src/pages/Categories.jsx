import Category from "../components/Category";
import Grid from "../components/Grid";

const categoryData = [
  { id: 1, name: "Category 1", url: "/" },
  { id: 2, name: "Category 2", url: "/" },
  { id: 3, name: "Category 3", url: "/" },
  { id: 4, name: "Category 4", url: "/" },
  { id: 5, name: "Category 5", url: "/" },
  { id: 6, name: "Category 6", url: "/" },
];

export default function Categories() {
  return (
    <div>
      <Grid
        title={"Catégories des produits"}
        items={categoryData}
        renderItem={(item) => (
          <Category key={item.id} name={item.name} url={item.url} />
        )}
      />
    </div>
  );
}
