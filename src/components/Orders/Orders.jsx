import CTAButton from "@shared/buttons/CTAButton";
import DownloadInvoiceButton from "@shared/buttons/DownloadInvoiceButton";
import DataStatus from "@shared/DataStatus";
import { fetchCustomerSubscription } from "@slices/subscriptionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  renderSubscriptionStatus,
  setMappedDate,
  setStripePrice,
} from "../utils/stripe/stripeUtils";

/**
 * Orders
 * Page de confirmation d'abonnement dynamique.
 * Affiche un résumé du premier abonnement du client après checkout.
 * Accessible uniquement si l'utilisateur est authentifié et que location.state.orderConfirmed === true.
 *
 * @component
 * @returns {JSX.Element}
 */
const Orders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user.user);

  const {
    current: subscriptions,
    loading,
    error,
  } = useSelector((state) => state.subscription);

  const customerId = user?.customerId;
  const subscription = subscriptions?.[0];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return;
    }
    if (!location.state?.orderConfirmed) {
      navigate("/", { replace: true });
      return;
    }
    if (customerId) {
      dispatch(fetchCustomerSubscription(customerId));
    }
  }, [isAuthenticated, location.state, customerId, dispatch, navigate]);

  // États de chargement et erreurs
  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto" role="region" aria-busy="true">
        <DataStatus
          dataLength={0}
          loading
          error={null}
          loadingMessage="Chargement de votre abonnement..."
        />
      </div>
    );
  }
  if (error) {
    return (
      <div
        className="p-6 max-w-4xl mx-auto"
        role="region"
        aria-live="assertive"
      >
        <DataStatus
          dataLength={0}
          loading={false}
          error={error}
          errorMessage={error}
        />
      </div>
    );
  }
  if (!subscription) {
    return (
      <div className="p-6 max-w-4xl mx-auto" role="region" aria-live="polite">
        <DataStatus
          dataLength={0}
          loading={false}
          error={null}
          emptyMessage="Aucun abonnement trouvé."
        />
      </div>
    );
  }

  const { productName, amount } = subscription;
  const date = setMappedDate(subscription);
  const renderedStatus = renderSubscriptionStatus(subscription.status);

  return (
    <div
      role="region"
      aria-labelledby="order-confirmation-title"
      className="max-w-2xl mx-auto py-16 px-4 text-center"
    >
      <h1
        id="order-confirmation-title"
        className="text-3xl font-bold mb-6"
        tabIndex={0}
      >
        🎉 Merci pour votre commande !
      </h1>

      <p className="mb-4 text-lg text-center">
        Votre souscription a bien été enregistrée.
      </p>
      <p className="mb-6 text-lg text-left">
        Voici les détails de votre abonnement :
      </p>
      <section
        className="bg-gray-100 dark:bg-gray-800 shadow rounded-xl p-6 mb-6"
        aria-labelledby="order-summary-title"
      >
        <h2 id="order-summary-title" className="sr-only">
          Détails de votre abonnement
        </h2>
        <dl className="grid grid-cols-1 gap-4">
          <div>
            <dt className="font-semibold">Date de souscription</dt>
            <dd className="">
              le <span>{date}</span>
            </dd>
          </div>
          <div>
            <dt className="font-semibold ">Abonnement</dt>
            <dd className="">{productName}</dd>
          </div>
          <div>
            <dt className="font-semibold ">Montant</dt>
            <dd className="">{setStripePrice(amount)}</dd>
          </div>
          <div>
            <dt className="font-semibold ">Statut</dt>
            <dd className="">{renderedStatus}</dd>
          </div>
          <div>
            <dt className="font-semibold ">Client</dt>
            <dd className="">
              {user?.firstname} {user?.lastname}
            </dd>
          </div>
        </dl>
      </section>

      <div className="flex items-center flex-col md:flex-row justify-center gap-4 mt-6">
        <DownloadInvoiceButton
          subscription={subscription}
          user={user}
          date={date}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200 underline transition-colors duration-200"
        />
        <CTAButton
          link="/"
          label="Retour à l’accueil"
          className="underline hover:text-gray-400"
          aria-label="Retourner à la page d'accueil"
        />
        <CTAButton
          link="/profile"
          label="Voir mon profil"
          className="underline hover:text-gray-400"
          aria-label="Aller à la page de profil"
        />
      </div>
    </div>
  );
};

export default Orders;
