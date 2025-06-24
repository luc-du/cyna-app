import ProductDetails from "@/components/ProductDetail/ProductDetails";
import { Helmet } from "react-helmet-async";

const ProductPage = () => {
  return (
    <>
      <Helmet>
        <title>Détail produit | CYNA</title>
        <meta
          name="description"
          content="Consultez les caractéristiques, prix et options d’abonnement pour ce service CYNA."
        />
      </Helmet>
      <ProductDetails />
    </>
  );
};

export default ProductPage;
