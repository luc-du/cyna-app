import Categories from "@components/Categories/Categories";
import { Helmet } from "react-helmet-async";

const CategoriesPage = () => {
  return (
    <>
      <Helmet>
        <title>Catégories | CYNA</title>
        <meta
          name="description"
          content="Explorez nos catégories de solutions de cybersécurité : SOC, SIEM, EDR, XDR et plus encore."
        />
      </Helmet>
      <Categories />
    </>
  );
};

export default CategoriesPage;
