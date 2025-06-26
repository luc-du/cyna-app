import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CTAButton from "@shared/buttons/CTAButton";
import DataStatus from "@shared/DataStatus";
import { getUserAddresses } from "@slices/addressSlice";
import { fetchPaymentMethods } from "@slices/paymentSlice";
import { createPriceThunk } from "@slices/priceSlice";
import { createCustomerSubscription } from "@slices/subscriptionSlice";
import { fetchUserProfile } from "@slices/userSlice";
import { useGlobalToast } from "../GlobalToastProvider";
import { getToken } from "../utils/auth/authStorage";
import AddressSelector from "./AddressSelector";
import CheckoutSummary from "./CheckoutSummary";
import PaymentSelector from "./PaymentSelector";
import TermsAgreement from "./TermsAgreement";

/* Stripe */
import { clearCart } from "@slices/cartSlice";
import { useStripe } from "@stripe/react-stripe-js";

/**
 * Checkout
 * Gère le flow de souscription :
 *  1. Création du Price Stripe
 *  2. Création de la Subscription (DEFAULT_INCOMPLETE)
 *  3. Confirmation du paiement via Stripe.js
 *  4. Redirection vers /order
 */
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useGlobalToast();

  /* Cart */
  const cart = useSelector((state) => state.cart);
  const item = cart?.items?.[0];

  /* Adresse */
  const addresses = useSelector((state) => state.address.list);
  const addressesLoading = useSelector((state) => state.address.loading);
  const addressesError = useSelector((state) => state.address.error);

  /* User */
  const user = useSelector((state) => state.user.user);
  const userId = user?.id;
  const customerId = user?.customerId;

  /* Paiement */
  const {
    list: methodsPaymentList,
    loading: methodPaymentLoading,
    error: methodPaymentError,
  } = useSelector((state) => state.payment);

  /* Stripe */
  const stripe = useStripe();

  /* Local state */
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [agreedToCGV, setAgreedToCGV] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  /**
   * Récupère adresses & moyens de paiement dès que l'utilisateur est connu
   */
  useEffect(() => {
    if (!user && getToken()) {
      dispatch(fetchUserProfile());
    }
    if (userId) {
      dispatch(getUserAddresses(userId));
      dispatch(fetchPaymentMethods(customerId));
    }
  }, [dispatch, user, userId, customerId, isAuthenticated, navigate]);

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
    showToast("Adresse sélectionnée", "info");
  };

  const handleSelectedPaymentMethod = (id) => {
    setSelectedPaymentMethodId(id);
    showToast("Moyen de paiement sélectionné", "info");
  };

  const handleCGVChange = (e) => {
    setAgreedToCGV(e.target.checked);
    showToast("Conditions Générales de vente acceptées", "info");
  };

  /**
   * Étapes au clic sur “Confirmer” :
   * - Validation des sélections
   * - Appels API Redux Thunk
   * - Confirmation Stripe
   * - Redirection
   */
  const handleConfirm = async () => {
    if (!selectedAddressId) {
      showToast("Veuillez sélectionner une adresse avant de valider.", "error");
      return;
    }
    if (!selectedPaymentMethodId) {
      showToast(
        "Veuillez sélectionner un moyen de paiement avant de valider.",
        "error"
      );
      return;
    }
    if (!agreedToCGV) {
      showToast("Veuillez accepter les conditions générales de vente", "error");
      return;
    }

    setIsProcessing(true);
    showToast("Paiement en cours...", "info");

    try {
      // 1) Création du Price
      const priceDto = {
        currency: "eur",
        amount: 200,
        productId: item.id,
        productName: item.name,
        description: item.description,
        pricingModel: item.pricingModel,
      };
      const createdPrice = await dispatch(createPriceThunk(priceDto)).unwrap();
      const stripePriceId = createdPrice.priceId;

      // 2) Création de la subscription côté API → obtention du clientSecret
      const { clientSecret } = await dispatch(
        createCustomerSubscription({
          customerId: user.customerId,
          priceId: stripePriceId,
          quantity: item.quantity,
        })
      ).unwrap();

      // 3) Confirmation du PaymentIntent avec Stripe.js
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: selectedPaymentMethodId,
        });

      if (stripeError || paymentIntent.status !== "succeeded") {
        throw new Error(
          stripeError?.message || "Erreur lors du paiement Stripe"
        );
      }

      showToast("Abonnement créé !", "success");

      // 3) Mise à jour de l'état utilisateur
      await dispatch(fetchUserProfile()).unwrap();

      //4) Nettoyage du panier
      dispatch(clearCart());

      // 5) Redirection vers la page de confirmation
      navigate("/order", {
        state: { orderConfirmed: true },
      });
    } catch (err) {
      console.error("Error subscription - checkout", err);
      showToast("Erreur lors de la souscription", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  // Render states
  if (!item) {
    return (
      <main className="p-6">
        <DataStatus
          dataLength={0}
          loading={false}
          error={null}
          emptyMessage="Votre panier est vide."
        />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="p-6 max-w-4xl mx-auto space-y-6">
        <DataStatus
          dataLength={0}
          loading={true}
          error={null}
          loadingMessage="Chargement des informations utilisateur..."
        />
      </main>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Valider mon abonnement</h1>

      <CheckoutSummary product={item} quantity={item.quantity} />

      <AddressSelector
        addresses={addresses}
        selectedId={selectedAddressId}
        onSelect={handleSelectAddress}
        loading={addressesLoading}
        error={addressesError}
      />

      <PaymentSelector
        methodsPaymentList={methodsPaymentList}
        selectedId={selectedPaymentMethodId}
        onSelect={handleSelectedPaymentMethod}
        loading={methodPaymentLoading}
        error={methodPaymentError}
      />

      <TermsAgreement
        hasAgreedToTerms={agreedToCGV}
        onTermsChange={handleCGVChange}
        isInModalOpen={true}
      />

      <div className="flex justify-end mt-6">
        <CTAButton
          label={
            isProcessing ? "Traitement en cours..." : "Confirmer mon abonnement"
          }
          className="cta-success"
          handleClick={handleConfirm}
          disabled={isProcessing}
          aria-label="Valider l’abonnement"
        />
      </div>
    </div>
  );
};
export default Checkout;
