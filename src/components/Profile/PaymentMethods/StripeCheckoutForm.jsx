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
      setError("Stripe n'est pas encore prêt. Veuillez patienter.");
      return;
    }

    setLoading(true);
    setError(null); //reset des autres erreurs

    // Récupérer l'élément CardElement de stripe
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      // Si CardElement n'est pas trouvé, cela signifie un problème avec le rendu de Stripe Elements.
      setError(
        "Impossible de récupérer le champ de carte. Veuillez réessayer."
      );
      setLoading(false); // S'assurer de désactiver le chargement
      return;
    }

    try {
      // Créer une méthode de paiement via Stripe
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      // débogage
      console.log("Payment Method created by Stripe:", paymentMethod);

      if (error) {
        // Gérer les erreurs renvoyées par Stripe (ex: carte invalide)
        setError(error.message);
      } else {
        onToken(paymentMethod.id);
        cardElement.clear(); //Effacer les champs de la carte après succès
      }
    } catch (err) {
      // Gérer les erreurs inattendues (réseau)
      console.error(
        "Erreur inattendue lors de la création de la méthode de paiement:",
        err
      );
      setError(err.message || "Une erreur inattendue est survenue.");
    } finally {
      setLoading(false); // Désactiver l'état de chargement, success ou error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {/* Composant CardElement de Stripe pour la saisie sécurisée des informations de carte */}
      <div className="mb-4">
        {" "}
        {/* Ajout d'une div pour le style de CardElement */}
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#333",
                "::placeholder": { color: "#888" },
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
