import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserAddresses } from "../../redux/slice/addressSlice";
import { fetchPaymentMethods } from "../../redux/slice/paymentSlice";
import { fetchUserProfile } from "../../redux/slice/userSlice";
import { useGlobalToast } from "../GlobalToastProvider";
import CGV from "../Legal/CGV";
import CTAButton from "../shared/buttons/CTAButton";
import DataStatus from "../shared/DataStatus";
import ModalOverlay from "../ui/ModalOverlay";
import { getToken } from "../utils/authStorage";
import AddressSelector from "./AddressSelector";
import CheckoutSummary from "./CheckoutSummary";
import PaymentSelector from "./PaymentSelector";

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

  /* 📌Debug corriger le naming de user et auth sur fetchUserProfile - doublon de 💩 */
  const userId = user?.id;
  const customerId = user?.customerId;

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);
  // useAuthEffect();
  console.log("📌user from authSlice", user);

  // CGV:
  const [agreedToCGV, setAgreedToCGV] = useState(false);

  //Modal CGV
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      console.log(fetchPaymentMethods(customerId));
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

  const handleConfirm = () => {
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

    setTimeout(() => {
      setIsProcessing(false);
      showToast("Paiement validé avec succès", "success");
      navigate("/order", { state: { orderConfirmed: true } });
    }, 2000);
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

      <section
        className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-6"
        aria-labelledby="card-selector-title"
      >
        <h2>Conditions Générales de Ventes</h2>
        <div className="flex items-center space-x-4">
          <label htmlFor="cgv">Accepter les C.G.V</label>
          <input
            type="checkbox"
            name="cgv"
            id="cgv"
            checked={agreedToCGV}
            onChange={handleCGVChange}
          />
        </div>
        <div className="flex items-center justify-end">
          <CTAButton
            handleClick={() => setIsModalOpen(true)}
            className="underline"
            label="Voir les C.G.V"
          />
        </div>
        {isModalOpen && (
          <ModalOverlay onClose={() => setIsModalOpen(false)}>
            <CGV isInModal={true} />
          </ModalOverlay>
        )}
      </section>

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
