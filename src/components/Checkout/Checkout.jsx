import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUserAddresses } from "../../redux/slice/addressSlice";
import { useGlobalToast } from "../GlobalToastProvider";
import CTAButton from "../shared/buttons/CTAButton";
import DataStatus from "../shared/DataStatus";
import AddressSelector from "./AddressSelector";
import CheckoutSummary from "./CheckoutSummary";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useGlobalToast();

  const cart = useSelector((state) => state.cart);
  const item = cart.items?.[0];

  const addresses = useSelector((state) => state.address.list);
  const user = useSelector((state) => state.user.user);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user?.id) dispatch(getUserAddresses(user.id));
  }, [user, dispatch]);

  const handleSelectedAddresses = (id) => {
    setSelectedAddressId(id);
    showToast("Adresse sélectionnée", "warning");
  };

  const handleConfirm = () => {
    if (!selectedAddressId) {
      showToast("Veuillez sélectionner une adresse avant de valider", "error");
      return;
    }

    // Simulation de paiement
    setIsProcessing(true);
    showToast("Paiement en cours...", "info");

    setTimeout(() => {
      setIsProcessing(false);
      showToast("Paiement validé avec succès", "success");

      // Redirection
      navigate("/order", { state: { orderConfirmed: true } });
    }, 2000);
  };

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

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Valider mon abonnement</h1>
      <CheckoutSummary product={item.product} quantity={item.quantity} />
      <AddressSelector
        addresses={addresses}
        selectedId={selectedAddressId}
        onSelect={handleSelectedAddresses}
      />
      <div className="flex justify-end mt-6">
        <CTAButton
          label={
            isProcessing ? "Traitement en cours..." : "Confirmer mon abonnement"
          }
          // className={"cta-primary"}
          handleClick={handleConfirm}
          disabled={isProcessing}
          aria-label="Valider l'abonnement et simuler le paiement"
        />
      </div>
    </main>
  );
}
