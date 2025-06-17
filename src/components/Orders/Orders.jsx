import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CTAButton from "../shared/buttons/CTAButton";

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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // Sécurité : redirection si pas d’état de validation
    if (!location.state?.orderConfirmed) {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  // Redirection si non connecté
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

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

      {/* Optionnel : Résumé simulé de commande */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <p className="font-semibold">
          Abonnement : <span className="font-normal">Premium Mensuel</span>
        </p>
        <p className="font-semibold">
          Montant : <span className="font-normal">29,99 €</span>
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
