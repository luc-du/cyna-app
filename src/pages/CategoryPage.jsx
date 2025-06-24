import CategoryDetails from "@components/Category/CategoryDetails";
import { Helmet } from "react-helmet-async";

const CategoryPage = () => {
  return (
    <>
      <Helmet>
        <title>Détail Catégorie | CYNA</title>
        <meta
          name="description"
          content="Découvrez les services proposés dans cette catégorie de cybersécurité : surveillance, détection, réponse aux incidents et plus encore."
        />
      </Helmet>
      <CategoryDetails />
    </>
  );
};

export default CategoryPage;
