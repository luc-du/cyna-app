import PropTypes from "prop-types";
import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  // 1. States :
  // 2.Functions:
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // 3. Render
  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-2 rounded-md shadow-lg text-white z-50 transition ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]),
  onClose: PropTypes.func.isRequired,
};

export default Toast;
