import Orders from "@components/Orders/Orders";
import { Helmet } from "react-helmet-async";

export default function OrderPage() {
  return (
    <>
      <Helmet>
        <title>Commandes | CYNA</title>
        <meta
          name="description"
          content="Retrouvez ici les informations liées à votre commande en cours ou validée sur CYNA."
        />
      </Helmet>
      <Orders />
    </>
  );
}
