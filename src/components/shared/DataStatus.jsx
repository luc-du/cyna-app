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
}) => {
  if (loading) {
    return (
      <Loader
        message={
          <p
            className="text-center text-blue-500 mt-4"
            role="status"
            aria-live="polite"
          >
            {loadingMessage}
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
      <p
        className="text-center text-gray-600 mt-4"
        role="status"
        aria-live="polite"
      >
        {emptyMessage}
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
};

export default DataStatus;
