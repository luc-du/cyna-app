import ProductList from "@components/ProductList";
import { Helmet } from "react-helmet-async";

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>Produits et services | CYNA</title>
        <meta
          name="description"
          content="Parcourez l’ensemble des produits et services CYNA : cybersécurité, SOC, SIEM, EDR, XDR, et plus encore."
        />
      </Helmet>
      <ProductList />
    </>
  );
};

export default ProductsPage;
