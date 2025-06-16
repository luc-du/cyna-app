import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAddresses } from "../../redux/slice/addressSlice";
import { useGlobalToast } from "../GlobalToastProvider";
import DataStatus from "../shared/DataStatus";
import AddressSelector from "./AddressSelector";
import CheckoutSummary from "./CheckoutSummary";

export default function Checkout() {
  const dispatch = useDispatch();
  const showToast = useGlobalToast();
  const cart = useSelector((state) => state.cart);
  const item = cart.items?.[0];

  const addresses = useSelector((state) => state.address.list);
  const user = useSelector((state) => state.user.user);

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    if (user?.id) dispatch(getUserAddresses(user.id));
  }, [user, dispatch]);

  const handleSelectedAddresses = (id) => {
    setSelectedAddressId(id);
    showToast("Adresse sélectionnée", "warning");
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
    </main>
  );
}
