import { useAuthEffect } from "../hooks/useAuthEffect";
import { useAutoLogout } from "../hooks/useAutoLogout";

/**
 * Composant Orders
 *
 * @description
 * Affiche la page des commandes de l'utilisateur, incluant un titre accessible et une description.
 * Ce composant applique des bonnes pratiques d'accessibilité :
 * - Utilisation d'attributs ARIA (`aria-label`, `aria-labelledby`, `role`, `tabIndex`)
 * - Structure claire pour la navigation clavier et les lecteurs d'écran
 *
 * @accessibilité
 * - Le titre et la description sont accessibles via `tabIndex={0}` et des attributs ARIA.
 * - La section principale est identifiée comme une région (`role="region"`) avec un label.
 *
 *
 * @returns {JSX.Element} La page des commandes de l'utilisateur.
 */
const Orders = () => {
  useAuthEffect();
  useAutoLogout();

  return (
    <main
      className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-6"
      aria-label="Page des commandes"
      tabIndex={-1}
    >
      <section
        className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full"
        aria-labelledby="orders-title"
        role="region"
      >
        <h1
          id="orders-title"
          className="text-2xl font-bold text-center mb-4"
          tabIndex={0}
        >
          Mes commandes
        </h1>
        <p className="text-center text-gray-600" tabIndex={0}>
          Historique des commandes à venir.
        </p>
        {/* TODO: table ou liste des commandes */}
      </section>
    </main>
  );
};

export default Orders;
