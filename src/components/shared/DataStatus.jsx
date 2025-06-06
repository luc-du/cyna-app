import PropTypes from "prop-types";
import Loader from "../../components/ui/Loader";

const DataStatus = ({
  loading,
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
            Chargement...
          </p>
        }
      />
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-4" role="alert">
        {error}
      </p>
    );
  }

  if (!loading && !error && dataLength === 0) {
    return (
      <p className="text-center text-gray-600 mt-4" role="status">
        {emptyMessage}
      </p>
    );
  }

  return null;
};

DataStatus.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  dataLength: PropTypes.number.isRequired,
  emptyMessage: PropTypes.string,
};

export default DataStatus;
