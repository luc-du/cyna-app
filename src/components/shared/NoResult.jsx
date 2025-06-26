import { emptyBox } from "@utils/indexImages";
import PropTypes from "prop-types";
/**
 * NoResult
 * Composant d'affichage fallback lorsqu'aucune donnée n'est disponible.
 * Affiche un message et une illustration neutre.
 *
 * @param {string} message - Message à afficher sous l’illustration
 */
const NoResult = ({ message = "Aucun résultat trouvé" }) => {
  return (
    <div
      className="text-center mt-10 text-gray-500 dark:text-gray-400"
      role="status"
      aria-live="polite"
    >
      <img
        src={emptyBox}
        alt="Aucun résultat visuel"
        className="mx-auto mb-4 w-24 h-24 opacity-80"
      />
      <p className="mt-4 text-base font-medium">{message}</p>
    </div>
  );
};

NoResult.propTypes = {
  message: PropTypes.string,
};

export default NoResult;
