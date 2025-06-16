import PropTypes from "prop-types";

/**
 * Résumé du produit sélectionné dans le panier
 * @param {object} props
 * @param {object} props.product – Produit sélectionné
 * @param {number} props.quantity – Quantité choisie
 */
export default function CheckoutSummary({ product, quantity }) {
  if (!product) {
    return (
      <div className="text-red-600 dark:text-red-400">
        Aucun produit sélectionné.
      </div>
    );
  }

  const total = product.price * quantity;

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
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-md border"
        />

        <div className="flex flex-col justify-between">
          <p className="font-medium text-gray-900 dark:text-white">
            {product.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {product.description || "Abonnement sélectionné"}
          </p>
          <p className="text-gray-800 dark:text-gray-100 mt-2">
            Prix unitaire : <strong>{product.price.toFixed(2)} €</strong>
          </p>
          <p className="text-gray-800 dark:text-gray-100">
            Quantité : <strong>{quantity}</strong>
          </p>
          <p className="mt-2 text-lg font-bold text-blue-600 dark:text-blue-400">
            Total : {total.toFixed(2)} €
          </p>
        </div>
      </div>
    </section>
  );
}

CheckoutSummary.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
  }),
  quantity: PropTypes.number.isRequired,
};
