import PropTypes from "prop-types";

/**
 * Loader
 *
 * Composant d'affichage d'un indicateur de chargement avec un message personnalisé.
 *
 * Props :
 * - message (string) : Message à afficher sous l'icône de chargement. Valeur par défaut : "Chargement en cours..."
 */
export default function Loader({ message = "Chargement en cours..." }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 text-gray-500">
      {/* Icône de chargement animée */}
      <svg
        className="animate-spin h-10 w-10 text-primary mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="status"
        aria-label="Chargement"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      {/* Message de chargement */}
      <p className="text-lg">{message}</p>
    </div>
  );
}

Loader.propTypes = {
  /** Message à afficher sous l'icône de chargement */
  message: PropTypes.string,
};
