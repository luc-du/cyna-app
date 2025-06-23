import { Link } from "react-router";
import { IconCrossCircle } from "../utils/indexImages";
/**
 * Composant React pour afficher une page d'accès refusé.
 *
 * @component
 * @returns {JSX.Element} Élément principal indiquant que l'utilisateur n'a pas les droits d'accès.
 *
 * @accessibilité
 * - Utilise des balises sémantiques (`<main>`, `<h1>`, `<p>`) pour une meilleure accessibilité.
 * - Les couleurs et contrastes sont adaptés pour la lisibilité.
 * - Les boutons et liens sont accessibles au clavier et disposent d'un focus visible.
 * - L'icône décorative n'est pas annoncée par les lecteurs d'écran (ajouter aria-hidden si nécessaire).
 *
 * @example
 * <Unauthorized />
 */
export default function Unauthorized() {
  return (
    <main
      className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-6"
      aria-labelledby="unauthorized-title"
    >
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1
          id="unauthorized-title"
          className="text-center text-xl font-bold text-red-600 mb-2"
        >
          Accès refusé
        </h1>
        <p className="text-gray-700">
          Vous n&apos;avez pas les droits pour accéder à cette page.
        </p>
        <div className="flex mt-6 justify-center mb-4" aria-hidden="true">
          <IconCrossCircle className="w-12 h-12 text-red-600" />
        </div>
        <div className="text-center">
          <Link
            to="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
