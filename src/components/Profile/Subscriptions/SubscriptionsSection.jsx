import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerSubscription } from "../../../redux/slice/subscriptionSlice";
import DataStatus from "../../shared/DataStatus";
import setMappedDate from "../../utils/setMappedDate";
import setStripePrice from "../../utils/stripe/stripeUtils";

export default function SubscriptionsSection() {
  const dispatch = useDispatch();
  const user = useSelector((subscription) => subscription.user.user);
  const {
    current: subs,
    loading,
    error,
  } = useSelector((subscription) => subscription.subscription);

  useEffect(() => {
    if (user?.customerId) {
      dispatch(fetchCustomerSubscription(user.customerId));
    }
  }, [dispatch, user?.customerId]);

  if (loading)
    return <DataStatus loading loadingMessage="Chargement des abonnements…" />;
  if (error) return <DataStatus error={error} />;
  if (!subs.length)
    return <DataStatus emptyMessage="Aucun abonnement trouvé." />;

  return (
    <div className="space-y-4">
      {subs.map((subscription) => {
        /* Setters - Mapped */
        const date = setMappedDate(subscription);
        const amount = setStripePrice(subscription.amount);

        return (
          <div
            key={subscription.subscriptionId}
            className="border rounded-lg p-4 bg-white dark:bg-gray-800"
          >
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-semibold">Date de souscription</dt>
                <dd>{date}</dd>
              </div>
              <div>
                <dt className="font-semibold">Produit</dt>
                <dd>{subscription.productName}</dd>
              </div>
              <div>
                <dt className="font-semibold">Montant</dt>
                <dd>{amount} €</dd>
              </div>
              <div>
                <dt className="font-semibold">Statut</dt>
                <dd>{subscription.status}</dd>
              </div>
            </dl>
          </div>
        );
      })}
    </div>
  );
}
