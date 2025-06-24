import Cart from "@components/Cart/Cart";
import { Helmet } from "react-helmet-async";

const CartPage = () => {
  return (
    <>
      <Helmet>
        <title>Panier | CYNA</title>
        <meta
          name="description"
          content="Consultez votre panier et finalisez votre commande de solutions SOC, SIEM, EDR, XDR."
        />
      </Helmet>
      <Cart />
    </>
  );
};

export default CartPage;
