import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";

/**
 * AddressListElement
 * Affiche les détails d'une adresse et propose actions modifier/supprimer.
 * Accessible : boutons avec aria-labels explicites.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.address - Objet adresse.
 * @param {Function} props.onEdit - Callback pour édition.
 * @param {Function} props.onDelete - Callback pour suppression.
 * @returns {JSX.Element}
 */
const AddressListElement = ({ address, onEdit, onDelete }) => (
  <div
    className="bg-white flex flex-col border border-slate-200 rounded-2xl gap-4 p-4 mt-2 dark:text-black"
    tabIndex={0}
  >
    <p>
      <strong>Nom:</strong> {address.name}
    </p>
    <p>
      <strong>Ville:</strong> {address.city}
    </p>
    <p>
      <strong>Code postal:</strong> {address.postcode}
    </p>
    <p>
      <strong>Pays:</strong> {address.country}
    </p>
    {address.url && (
      <p>
        <strong>Localisation:</strong>
        <span>
          <a
            href={address.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600 underline"
            aria-label="Voir sur Google Maps"
          >
            {""} Google Maps
          </a>
        </span>
      </p>
    )}
    <div className="flex justify-end gap-4 mt-2">
      <CTAButton
        label="Modifier"
        handleClick={onEdit}
        className="cta-warning"
        aria-label="Modifier cette adresse"
      />
      <CTAButton
        label="Supprimer"
        handleClick={onDelete}
        className="cta-danger"
        aria-label="Supprimer cette adresse"
      />
    </div>
  </div>
);

AddressListElement.propTypes = {
  address: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    postcode: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    url: PropTypes.string,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AddressListElement;
