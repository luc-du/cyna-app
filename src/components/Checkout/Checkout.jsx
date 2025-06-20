import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserAddresses } from "../../redux/slice/addressSlice";
import { fetchPaymentMethods } from "../../redux/slice/paymentSlice";
import { createPriceThunk } from "../../redux/slice/priceSlice";
import { createCustomerSubscription } from "../../redux/slice/subscriptionSlice";
import { fetchUserProfile } from "../../redux/slice/userSlice";
import { useGlobalToast } from "../GlobalToastProvider";
import CTAButton from "../shared/buttons/CTAButton";
import DataStatus from "../shared/DataStatus";
import { getToken } from "../utils/authStorage";
import AddressSelector from "./AddressSelector";
import CheckoutSummary from "./CheckoutSummary";
import PaymentSelector from "./PaymentSelector";
import TermsAgreement from "./TermsAgreement";

export default function Checkout() {
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

  /* Paiement */
  const { list: methodsPaymentList } = useSelector((state) => state.payment);
  const methodPaymentError = useSelector((state) => state.payment.error);
  const methodPaymentLoading = useSelector((state) => state.payment.loading);

  const userId = user?.id;
  const customerId = user?.customerId;

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);

  // CGV:
  const [agreedToCGV, setAgreedToCGV] = useState(false);

  useEffect(() => {
    if (!user && getToken()) {
      dispatch(fetchUserProfile());
    }
    if (user?.id) {
      // 1.mon user
      dispatch(getUserAddresses(user));
      // 2.adresse de user
      dispatch(getUserAddresses(userId));
      // 3.paiement
      dispatch(fetchPaymentMethods(customerId));
    }
  }, [dispatch, user, userId, customerId]);

  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
    showToast("Adresse sélectionnée", "info");
  };

  const handleSelectedPaymentMethod = async (id) => {
    setSelectedPaymentMethodId(id);
    showToast("Moyen de paiement sélectionné", "info");
  };

  const handleCGVChange = (event) => {
    setAgreedToCGV(event.target.checked);
    showToast("Conditions Générales de ventes acceptées", "info");
  };

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

    /* Modal */

    setIsProcessing(true);
    showToast("Paiement en cours...", "info");

    try {
      console.log("🛒 from checkout - item:", item);

      // 1.Créer l’objet Price dans Stripe
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

      let payload;

      if (item.pricingModel !== "PAY_AS_YOU_GO") {
        payload = {
          customerId: user.customerId,
          priceId: stripePriceId,
          quantity: item.quantity,
        };
      } else {
        payload = {
          customerId: user.customerId,
          priceId: stripePriceId,
          quantity: item.quantity,
        };
      }

      console.log("📌Payload from Checkout");

      await dispatch(createCustomerSubscription(payload)).unwrap();

      showToast("Abonnement créé !", "success");
      navigate("/order", { state: { orderConfirmed: true } });
    } catch (error) {
      showToast("Erreur lors de la souscription");
      console.error("🔩Error subscription - checkout", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Cas panier vide
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

  // Cas user non encore chargé
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
        setIsModalOpen={"setIsModalOpen"}
      />

      <div className="flex justify-end mt-6">
        <CTAButton
          label={
            isProcessing ? "Traitement en cours..." : "Confirmer mon abonnement"
          }
          className="cta-success"
          handleClick={handleConfirm}
          disabled={isProcessing}
          aria-label="Valider l’abonnement et simuler un paiement"
        />
      </div>
    </div>
  );
}
