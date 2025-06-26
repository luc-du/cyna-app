import { emptyBox } from "@utils/indexImages";
import PropTypes from "prop-types";
/**
 * Composant d'état vide (EmptyState)
 *
 * Affiche un message et une image lorsqu'aucun résultat n'est trouvé.
 *
 * Props :
 * - message (string) : Message à afficher. Valeur par défaut : "Aucun résultat trouvé."
 */
export default function EmptyState({ message = "Aucun résultat trouvé." }) {
  return (
    <section
      className="text-center py-12 text-gray-500"
      aria-label="Aucun résultat"
      role="status"
    >
      <img
        src={emptyBox}
        alt=""
        role="presentation"
        aria-hidden="true"
        className="mx-auto w-24 h-24 opacity-60 mb-4"
      />
      <p className="text-lg" tabIndex={0}>
        {message}
      </p>
    </section>
  );
}

EmptyState.propTypes = {
  message: PropTypes.string,
};
