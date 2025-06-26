import CTAButton from "@shared/buttons/CTAButton";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types"; // Importation de PropTypes
import { useState } from "react";

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
   * @param {React.FormEvent<HTMLFormElement>} e -
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe n'est pas encore prêt. Veuillez patienter.");
      return;
    }

    setLoading(true);
    setError(null); //reset des autres erreurs

    // Récupérer l'élément CardElement de stripe
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError(
        "Impossible de récupérer le champ de carte. Veuillez réessayer."
      );
      setLoading(false);
      return;
    }

    try {
      // Créer une méthode de paiement via Stripe
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
      } else {
        onToken(paymentMethod.id);
        cardElement.clear();
      }
    } catch (err) {
      // Gérer les erreurs inattendues (réseau)
      console.error(
        "Erreur inattendue lors de la création de la méthode de paiement:",
        err
      );
      setError(err.message || "Une erreur inattendue est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
                "::placeholder": {
                  color: "#94a3b8",
                },
              },
              invalid: {
                color: "#f87171",
              },
            },
            hidePostalCode: true,
          }}
        />
      </div>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}{" "}
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
