import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";

/**
 * Renvoie une classe CSS en fonction du type de message.
 * @param {"success" | "warning" | "error" | "info"} type
 * @returns {string}
 */
const getStyleByType = (type) => {
  switch (type) {
    case "success":
      return "bg-green-100 border-l-4 border-green-500 text-green-700";
    case "warning":
      return "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700";
    case "error":
      return "bg-red-100 border-l-4 border-red-500 text-red-700";
    default:
      return "bg-gray-100 border-l-4 border-gray-500 text-gray-700";
  }
};

/**
 * Composant Toast (notification flottante).
 *
 * @param {Object} props
 * @param {string} props.message - Message à afficher.
 * @param {"success" | "warning" | "error" | "info"} props.type - Type de toast.
 * @param {Function} props.onClose - Fonction appelée à la fermeture.
 */
const Toast = ({ message, type = "success", onClose }) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 p-4 rounded shadow-lg w-full max-w-sm flex justify-between items-center ${getStyleByType(
        type
      )}`}
      role="alert"
      aria-live="assertive"
      aria-label={`Notification ${type}`}
    >
      <span className="text-sm">{message}</span>
      <button
        onClick={onClose}
        aria-label="Fermer la notification"
        className="ml-4 text-xl"
      >
        <FaTimes />
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "warning", "error", "info"]),
  onClose: PropTypes.func.isRequired,
};

export default Toast;
