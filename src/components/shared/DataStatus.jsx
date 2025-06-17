import PropTypes from "prop-types";
import Loader from "../../components/ui/Loader";

// Helper utilitaire pour tester si la data est "vide"
const isEmpty = (data) => {
  if (Array.isArray(data)) return data.length === 0;
  if (data && typeof data === "object") return Object.keys(data).length === 0;
  return !data; // null, undefined, false, '', 0
};

/**
 * Composant utilitaire pour afficher un état de chargement, une erreur ou un message vide.
 */
const DataStatus = ({
  loading,
  loadingMessage = "Chargement...",
  error = null,
  dataLength,
  emptyMessage = "Aucune donnée disponible pour le moment.",
  children = null,
  ctaButton = null, // Nouvelle prop pour le bouton CTA
}) => {
  if (loading) {
    return (
      <Loader
        message={
          <p
            className="text-center text-blue-500 mt-4 dark:text-white"
            role="status"
            aria-live="polite"
          >
            {loadingMessage}
            {/* Si c'est un children, on le met après le message de chargement */}
            {children}
            {/* Si un CTAButton est fourni, on l'affiche sous le message de chargement */}
            {ctaButton && <div className="mt-4">{ctaButton}</div>}
          </p>
        }
      />
    );
  }

  if (error && typeof error === "object" && error.message) {
    error = error.message;
  }

  if (!loading && !error && dataLength !== null && isEmpty(dataLength)) {
    return (
      <div className="text-center mt-4" role="status" aria-live="polite">
        <p className="text-gray-600 mb-4">{emptyMessage}</p>
        {/* Si un CTAButton est fourni, on l'affiche sous le message vide */}
        {ctaButton && <div>{ctaButton}</div>}
      </div>
    );
  }

  // Si une erreur est présente, afficher le message d'erreur
  if (error) {
    return (
      <p
        className="text-center text-red-500 mt-4"
        role="alert"
        aria-live="assertive"
      >
        Erreur : {error}
      </p>
    );
  }

  return null;
};

DataStatus.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Error),
    PropTypes.object,
  ]),
  dataLength: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
    PropTypes.string,
  ]),
  emptyMessage: PropTypes.string,
  children: PropTypes.node,
  ctaButton: PropTypes.node,
};

export default DataStatus;
