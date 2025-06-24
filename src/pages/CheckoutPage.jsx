import Checkout from "@/components/Checkout/Checkout";
import { Helmet } from "react-helmet-async";

const CheckoutPage = () => {
  return (
    <>
      <Helmet>
        <title>Paiement | CYNA</title>
        <meta
          name="description"
          content="Validez votre commande et finalisez le paiement de vos services de cybersécurité avec CYNA."
        />
      </Helmet>
      <Checkout />
    </>
  );
};

export default CheckoutPage;
