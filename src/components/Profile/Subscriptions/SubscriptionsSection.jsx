import { SUBSCRIPTION_CANCELED_SUCCESS } from "@lib/successMessages";
import DataStatus from "@shared/DataStatus";
import {
  fetchCustomerSubscription,
  modifySubscription,
  removeSubscription,
} from "@slices/subscriptionSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalToast } from "../../GlobalToastProvider";
import ConfirmModal from "../../ui/ConfirmModal";
import SubscriptionListElement from "../Address/SubscriptionListElement";
import UpdateSubscriptionModal from "./UpdateSubscriptionModal";

export default function SubscriptionsSection() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.user);
  const { current: subs, loading, error } = useSelector((s) => s.subscription);
  const { showToast } = useGlobalToast();

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
      onConfirm: async () => {
        await dispatch(removeSubscription(subscriptionId));
        await dispatch(fetchCustomerSubscription(user.customerId));
        showToast(SUBSCRIPTION_CANCELED_SUCCESS, "success");
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
      <ul className="space-y-4">
        {subs.map((sub) => {
          return (
            <SubscriptionListElement
              key={sub.subscriptionId}
              sub={sub}
              onModify={() => handleModify(sub)}
              onCancel={() => handleCancel(sub.subscriptionId, sub.productName)}
              loading={loading}
            />
          );
        })}
      </ul>
      {confirmModal}
      {updateModal}
    </>
  );
}
