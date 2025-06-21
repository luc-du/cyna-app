import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerSubscription,
  modifySubscription,
  removeSubscription,
} from "../../../redux/slice/subscriptionSlice";
import CTAButton from "../../shared/buttons/CTAButton";
import DataStatus from "../../shared/DataStatus";
import ConfirmModal from "../../ui/ConfirmModal";
import {
  renderSubscriptionStatus,
  setMappedDate,
} from "../../utils/stripe/stripeUtils";
import UpdateSubscriptionModal from "./UpdateSubscriptionModal";

export default function SubscriptionsSection() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.user);
  const { current: subs, loading, error } = useSelector((s) => s.subscription);

  const [confirmConfig, setConfirmConfig] = useState(null);
  const [updateConfig, setUpdateConfig] = useState(null);

  useEffect(() => {
    if (user?.customerId) {
      dispatch(fetchCustomerSubscription(user.customerId));
    }
  }, [dispatch, user?.customerId]);

  if (loading)
    return <DataStatus loading loadingMessage="Chargement des abonnements…" />;
  if (error) return <DataStatus error={error} />;
  if (!subs.length)
    return (
      <DataStatus loading={loading} emptyMessage="Aucun abonnement trouvé." />
    );

  const handleCancel = (subscriptionId, productName) => {
    setConfirmConfig({
      title: "Résilier l’abonnement",
      message: `Voulez-vous vraiment résilier l’abonnement "${productName}" ?`,
      onConfirm: () => {
        dispatch(removeSubscription(subscriptionId));
        setConfirmConfig(null);
      },
    });
  };

  const handleModify = (subscription) => {
    setUpdateConfig({ subscription });
  };

  const closeModals = () => {
    setConfirmConfig(null);
    setUpdateConfig(null);
  };

  const confirmModal = confirmConfig && (
    <ConfirmModal
      title={confirmConfig.title}
      message={confirmConfig.message}
      onConfirm={confirmConfig.onConfirm}
      onCancel={closeModals}
    />
  );

  const updateModal = updateConfig && (
    <UpdateSubscriptionModal
      subscription={updateConfig.subscription}
      onConfirm={(data) => {
        dispatch(modifySubscription(data));
        closeModals();
      }}
      onCancel={closeModals}
    />
  );

  return (
    <>
      <div className="space-y-4">
        {subs.map((sub) => {
          const date = setMappedDate(sub);
          const status = renderSubscriptionStatus(sub.status);
          return (
            <div
              key={sub.subscriptionId}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800"
            >
              <dl className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <dt className="font-semibold">Date de souscription</dt>
                  <dd>{date}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Produit</dt>
                  <dd>{sub.productName}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Montant</dt>
                  <dd>{sub.amount} €</dd>
                </div>
                <div>
                  <dt className="font-semibold">Statut</dt>
                  <dd>{status}</dd>
                </div>
              </dl>
              <div className="flex items-center justify-end space-x-4">
                <CTAButton
                  handleClick={() => handleModify(sub)}
                  label="Modifier"
                  className="underline"
                  disabled={loading}
                  aria-label={`Modifier l'abonnement ${sub.productName}`}
                />
                <CTAButton
                  handleClick={() =>
                    handleCancel(sub.subscriptionId, sub.productName)
                  }
                  label="Résilier"
                  className="cta-danger"
                  disabled={loading}
                  aria-label={`Résilier l'abonnement ${sub.productName}`}
                />
              </div>
            </div>
          );
        })}
      </div>
      {confirmModal}
      {updateModal}
    </>
  );
}
