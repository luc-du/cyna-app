import { useSelector } from "react-redux";
import { useAuthEffect } from "../hooks/useAuthEffect";
import { useAutoLogout } from "../hooks/useAutoLogout";
import Unauthorized from "./Unauthorized";

/**
 * Composant Dashboard
 *
 * @description
 * Affiche le tableau de bord principal de l'utilisateur connecté.
 * Gère l'affichage conditionnel selon le rôle de l'utilisateur (ADMIN ou USER).
 * Utilise les hooks d'authentification et de déconnexion automatique.
 * Prend en charge l'accessibilité via les attributs ARIA (aria-label, aria-busy, aria-live, role, etc.).
 *
 * @accessibilité
 * - Utilisation d'attributs ARIA pour améliorer l'expérience des utilisateurs de lecteurs d'écran.
 * - Gestion des états de chargement et des erreurs avec des rôles et alertes appropriés.
 * - Structure sémantique claire avec <main> et <section>.
 *
 * @returns {JSX.Element} Le composant du tableau de bord adapté au rôle de l'utilisateur.
 *
 * @example
 * <Dashboard />
 *
 * @requires useAuthEffect, useAutoLogout, useSelector
 *
 * @prop {object} user - Utilisateur connecté, récupéré depuis le store Redux.
 * @prop {string} user.firstname - Prénom de l'utilisateur affiché dans le message de bienvenue.
 * @prop {string} user.role - Rôle de l'utilisateur ("ADMIN" ou "USER") pour l'affichage conditionnel.
 */
const Dashboard = () => {
  useAuthEffect();
  useAutoLogout();

  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <main
        className="min-h-screen w-full flex items-center justify-center"
        aria-busy="true"
        aria-live="polite"
      >
        <Unauthorized />
      </main>
    );
  }

  return (
    <main
      className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-6"
      aria-label="Tableau de bord"
      tabIndex={-1}
    >
      <section
        className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full"
        aria-labelledby="dashboard-title"
        role="region"
      >
        <h1
          id="dashboard-title"
          className="text-3xl font-bold text-center mb-4"
        >
          Bienvenue {user.firstname}
        </h1>

        {user.role === "ADMIN" ? (
          <div aria-label="Espace administrateur">
            <p className="text-center text-gray-700 mb-2">
              Espace administrateur
            </p>
            {/* TODO : widgets admin (stats, utilisateurs, produits, etc.) */}
          </div>
        ) : user.role === "USER" ? (
          <div aria-label="Tableau de bord utilisateur">
            <p className="text-center text-gray-700 mb-2">
              Votre tableau de bord personnel
            </p>
            {/* TODO : accès commandes, infos, produits favoris */}
          </div>
        ) : (
          <p
            className="text-red-500 text-center"
            role="alert"
            aria-live="assertive"
          >
            Rôle non reconnu : {user.role}
          </p>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
