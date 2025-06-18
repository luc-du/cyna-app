import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCustomerSubscription } from "../../redux/slice/subscriptionSlice";
import CTAButton from "../shared/buttons/CTAButton";
import DataStatus from "../shared/DataStatus";

/**
 * Page de confirmation de commande
 * Affiche un message de succès après le checkout.
 * Accessible uniquement via location.state.orderConfirmed === true
 *
 * @returns {JSX.Element}
 */
const Orders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  console.log("From orders - user:", user);

  const {
    current: subscriptions,
    loading,
    error,
  } = useSelector((state) => state.subscription);

  const customerId = user?.customerId;
  const firstSubscription = subscriptions?.[0];
  console.log("From orders - firstSubscription:", firstSubscription);

  useEffect(() => {
    // Redirection si non connecté
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
      return; // Ajout d'un return pour arrêter l'exécution si non authentifié
    }
    // Sécurité : redirection si pas d’état de validation
    if (!location.state?.orderConfirmed) {
      navigate("/", { replace: true });
      return;
    }

    if (customerId) {
      dispatch(fetchCustomerSubscription(customerId));
    }
  }, [location, navigate, dispatch, customerId, isAuthenticated]);

  /* DataStatus */
  if (loading) {
    return (
      <main className="p-6 max-w-4xl mx-auto space-y-6">
        <DataStatus
          dataLength={0} // ou null si tu ne connais pas la longueur initiale
          loading={true}
          error={null}
          loadingMessage="Chargement du détail de votre abonnement..."
        />
      </main>
    );
  }
  if (error) {
    return (
      <main className="p-6 max-w-4xl mx-auto space-y-6">
        <DataStatus
          dataLength={0}
          loading={false}
          error={error}
          errorMessage={error}
        />
      </main>
    );
  }

  if (!firstSubscription) {
    return (
      <main className="p-6">
        <DataStatus
          dataLength={0}
          loading={false}
          error={null}
          emptyMessage="Aucun abonnement trouvé pour ce client."
        />
      </main>
    );
  }

  return (
    <main
      role="main"
      aria-labelledby="order-confirmation-title"
      className="max-w-2xl mx-auto py-16 px-4 text-center text-gray-800 dark:text-gray-100"
    >
      <h1 id="order-confirmation-title" className="text-3xl font-bold mb-6">
        🎉 Merci pour votre commande !
      </h1>

      <p className="mb-4 text-lg">
        Votre souscription a bien été enregistrée. Un e-mail de confirmation
        vous a été envoyé.
      </p>

      {/* Résumé dynamique de commande */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <p className="font-semibold">Date</p>
        <p className="font-semibold">
          Abonnement :{" "}
          <span className="font-normal">{firstSubscription.productName}</span>
        </p>
        <p className="font-semibold">
          Montant :{" "}
          <span className="font-normal">
            {(firstSubscription.amount / 100).toFixed(2)} €
          </span>{" "}
        </p>
        <p className="font-semibold">
          Statut :{" "}
          <span className="font-normal">{firstSubscription.status}</span>
        </p>
        <p className="font-semibold">
          Client :{" "}
          <span className="font-normal">
            {user?.firstname} {user?.lastname}
          </span>
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <CTAButton
          label="Retour à l’accueil"
          handleClick={() => navigate("/")}
          className="cta-primary"
          aria-label="Retour à la page d'accueil"
        />
        <CTAButton
          label="Voir mon profil"
          handleClick={() => navigate("/profile")}
          className="cta-secondary"
          aria-label="Accéder à mon profil"
        />
      </div>
    </main>
  );
};

export default Orders;
