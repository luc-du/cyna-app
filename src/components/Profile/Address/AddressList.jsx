import PropTypes from "prop-types";
import AddressListElement from "./AddressListElement";

/**
 * AddressList
 * Affiche la liste des adresses utilisateur.
 * Accessible : structure ARIA avec rôle list et aria-labelledby.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.addresses - Tableau d'objets adresse.
 * @param {Function} props.onEdit - Callback pour éditer une adresse.
 * @param {Function} props.onDelete - Callback pour supprimer une adresse.
 * @returns {JSX.Element}
 */
const AddressList = ({ addresses, onEdit, onDelete }) => (
  <div
    id="address-list"
    className="container-profile-section "
    aria-labelledby="address-list-title"
    role="region"
    tabIndex={-1}
  >
    {addresses.length > 0 ? (
      <ul role="list">
        {addresses.map((address) => (
          <li key={address.id} role="listitem">
            <AddressListElement
              address={address}
              onEdit={() => onEdit(address)}
              onDelete={() => onDelete(address.id)}
            />
          </li>
        ))}
      </ul>
    ) : (
      <p role="status">Aucune adresse renseignée.</p>
    )}
  </div>
);

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      postcode: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      url: PropTypes.string,
      userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AddressList;
