// AddressListElement.jsx
import PropTypes from "prop-types";
import CTAButton from "../../shared/buttons/CTAButton";

/**
 * Élément représentant une adresse.
 * @param {{ address: object, onEdit: func, onDelete: func }} props
 */
const AddressListElement = ({ address, onEdit, onDelete }) => (
  <li className="flex flex-col gap-2 mb-4">
    <p>
      <strong>Nom :</strong> {address.name}
    </p>
    <p>
      <strong>Ville :</strong> {address.city}
    </p>
    <p>
      <strong>Code postal :</strong> {address.postcode}
    </p>
    <p>
      <strong>Pays :</strong> {address.country}
    </p>
    {address.url && (
      <p>
        <strong>
          <a
            href={address.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-600"
          >
            Google map
          </a>
        </strong>
      </p>
    )}
    <div className="flex justify-end gap-4 mt-2">
      <CTAButton
        label="Modifier"
        onClick={onEdit}
        className="cta-warning"
        aria-label="Modifier l'adresse"
      />
      <CTAButton
        label="Supprimer"
        onClick={onDelete}
        className="cta-danger"
        aria-label="Supprimer l'adresse"
      />
    </div>
  </li>
);

AddressListElement.propTypes = {
  address: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AddressListElement;
