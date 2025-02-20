import placeholder from "../assets/images/cloud.jpg";
import placeholder2 from "../assets/images/edr.jpg";
import placeholder3 from "../assets/images/edrPremium.jpg";
import Category from "../components/Category";
import Grid from "../components/Grid";

const categoryData = [
  {
    id: 1,
    name: "Service 1",
    url: "/service-1",
    imageUrl: placeholder,
    products: [
      { name: "Produit A", img: placeholder2, imageUrl: placeholder },
      { name: "Produit B", img: placeholder2, imageUrl: placeholder },
      { name: "Produit C", img: placeholder2, imageUrl: placeholder },
    ],
  },
  {
    id: 2,
    name: "Service 2",
    url: "/service-2",
    imageUrl: placeholder2,
    products: [
      { name: "Produit D", img: placeholder2, imageUrl: placeholder },
      { name: "Produit E", img: placeholder2, imageUrl: placeholder },
      { name: "Produit F", img: placeholder2, imageUrl: placeholder },
    ],
  },
  {
    id: 3,
    name: "Service 3",
    url: "/service-3",
    imageUrl: placeholder3,
    products: [
      { name: "Produit D", img: placeholder2, imageUrl: placeholder },
      { name: "Produit E", img: placeholder2, imageUrl: placeholder },
      { name: "Produit F", img: placeholder2, imageUrl: placeholder },
    ],
  },
  {
    id: 4,
    name: "Service 4",
    url: "/service-4",
    imageUrl: placeholder,
    products: [
      { name: "Produit A", img: placeholder2, imageUrl: placeholder },
      { name: "Produit B", img: placeholder2, imageUrl: placeholder },
      { name: "Produit C", img: placeholder2, imageUrl: placeholder },
    ],
  },
  {
    id: 5,
    name: "Service 5",
    url: "/service-5",
    imageUrl: placeholder2,
    products: [
      { name: "Produit D", imageUrl: placeholder },
      { name: "Produit E", imageUrl: placeholder },
      { name: "Produit F", imageUrl: placeholder },
    ],
  },
  {
    id: 6,
    name: "Service 6",
    url: "/service-6",
    imageUrl: placeholder3,
    products: [
      { name: "Produit D", imageUrl: placeholder },
      { name: "Produit E", imageUrl: placeholder },
      { name: "Produit F", imageUrl: placeholder },
    ],
  },
];

export default function Categories() {
  return (
    <>
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
    </>
  );
}
