// src/components/Profile/Subscriptions/UpdateSubscriptionModal.jsx
import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { useState } from "react";
import ModalOverlay from "../../ui/ModalOverlay";

export default function UpdateSubscriptionModal({
  subscription,
  onConfirm,
  onCancel,
}) {
  const [quantity, setQuantity] = useState(subscription.quantity || 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      subscriptionId: subscription.subscriptionId,
      priceId: subscription.priceId,
      quantity: Number(quantity),
    });
  };

  return (
    <ModalOverlay onClose={onCancel}>
      <form onSubmit={handleSubmit} className="p-4">
        <h3 className="text-lg font-semibold mb-4">Modifier l’abonnement</h3>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Quantité
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <CTAButton
            type="submit"
            label="Enregistrer"
            className="cta-success"
          />
          <CTAButton
            handleClick={onCancel}
            label="Annuler"
            className="underline text-gray-700 dark:text-gray-300"
            type="button"
          />
        </div>
      </form>
    </ModalOverlay>
  );
}

UpdateSubscriptionModal.propTypes = {
  subscription: PropTypes.shape({
    subscriptionId: PropTypes.string.isRequired,
    priceId: PropTypes.string.isRequired,
    quantity: PropTypes.number,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
