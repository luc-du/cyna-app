import { toggleDarkMode } from "@slices/uiSlice";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

/**
 * Bouton d'activation/désactivation du mode sombre.
 * @param {string} [variant] - "button" | "switch"
 */
const DarkModeToggle = ({ variant = "button" }) => {
  const isDark = useSelector((state) => state.ui.darkMode);
  const dispatch = useDispatch();

  const handleToggle = () => dispatch(toggleDarkMode());

  if (variant === "switch") {
    return (
      <label className="inline-flex items-center cursor-pointer">
        <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {isDark ? "Mode sombre" : "Mode clair"}
        </span>
        <input
          type="checkbox"
          className="sr-only"
          checked={isDark}
          onChange={handleToggle}
          aria-label="Activer le mode sombre"
        />
        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300">
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              isDark ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </label>
    );
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={`Passer en mode ${isDark ? "clair" : "sombre"}`}
      className="text-sm px-3 py-1 rounded-md bg-white text-primary dark:bg-gray-700 dark:text-white transition-colors"
    >
      {isDark ? "☀️ Clair" : "🌙 Sombre"}
    </button>
  );
};

DarkModeToggle.propTypes = {
  variant: PropTypes.oneOf(["button", "switch"]),
};

export default DarkModeToggle;
