import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types"; // Importation de PropTypes
import { useState } from "react";
import CTAButton from "../../shared/buttons/CTAButton";

/**
 * @typedef {object} StripeCheckoutFormProps
 * @property {(tokenId: string) => void} onToken - Fonction de rappel (callback) appelée avec l'ID du jeton de paiement Stripe en cas de succès.
 */

/**
 * StripeCheckoutForm est un composant de formulaire React pour la saisie des informations de carte bancaire via Stripe.
 * Il utilise les hooks `useStripe` et `useElements` de `@stripe/react-stripe-js` pour gérer le processus de paiement.
 *
 * @param {StripeCheckoutFormProps} props - Les propriétés du composant.
 * @returns {JSX.Element} Le formulaire de paiement Stripe.
 */
const StripeCheckoutForm = ({ onToken }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Gère la soumission du formulaire de paiement.
   * @param {React.FormEvent<HTMLFormElement>} e - L'événement de soumission du formulaire.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      // Si la création de la méthode de paiement est réussie, appelle la fonction onToken avec l'ID de la méthode de paiement
      onToken(paymentMethod.id);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {/* Composant CardElement de Stripe pour la saisie sécurisée des informations de carte */}
      <CardElement options={{ hidePostalCode: true }} />
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex items-center justify-end mt-6">
        <CTAButton
          type="submit"
          label={loading ? "En cours…" : "Ajouter"}
          disabled={!stripe || loading}
          className={"cta-success"}
        />
      </div>
    </form>
  );
};

StripeCheckoutForm.propTypes = {
  /**
   * Fonction de rappel (callback) appelée avec l'ID du jeton de paiement Stripe en cas de succès.
   * @type {(tokenId: string) => void}
   */
  onToken: PropTypes.func.isRequired,
};

export default StripeCheckoutForm;
