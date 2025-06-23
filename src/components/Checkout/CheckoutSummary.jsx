import PropTypes from "prop-types";
import EmptyState from "../ui/EmptyState";
import { getImageSrc } from "../utils/getImageSrc";
import { getPricingLabel } from "../utils/getPricingLabel";
import { setStripePrice } from "../utils/stripe/stripeUtils";

/**
 * Résumé du produit sélectionné dans le panier
 * @param {object} props
 * @param {object} props.product – Produit sélectionné
 * @param {number} props.quantity – Quantité choisie
 */
export default function CheckoutSummary({ product, quantity }) {
  if (!product) {
    return <EmptyState message="Aucun produit sélectionné." />;
  }

  const total = product.price * quantity;
  const imageUrl = getImageSrc(product);

  const { name, pricingModel, description, price } = product;
  const normalizedPricingModel = getPricingLabel(pricingModel);
  return (
    <section
      className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-6"
      aria-labelledby="checkout-summary-title"
    >
      <h2
        id="checkout-summary-title"
        className="text-xl font-semibold mb-4 text-gray-800 dark:text-white"
      >
        Résumé de votre commande
      </h2>

      <div className="flex items-center gap-4">
        <img
          src={product.imageUrl}
          alt={name}
          className="w-24 h-24 object-cover rounded-md border"
        />

        <div className="flex flex-col justify-between">
          <p className="font-medium text-gray-900 dark:text-white">{name}</p>
          <p className="font-medium text-gray-900 dark:text-white">
            {normalizedPricingModel}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description && description}
          </p>
          <p className="text-gray-800 dark:text-gray-100 mt-2">
            Prix unitaire : <strong>{setStripePrice(price)}</strong>
          </p>
          <p className="text-gray-800 dark:text-gray-100">
            Quantité : <strong>{quantity}</strong>
          </p>
          <p className="mt-2 text-lg font-bold text-blue-600 dark:text-blue-400">
            Total : {setStripePrice(total)}
          </p>
        </div>
      </div>
    </section>
  );
}

CheckoutSummary.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    pricingModel: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  quantity: PropTypes.number.isRequired,
};
