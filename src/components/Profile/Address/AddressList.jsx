// AddressList.jsx
import PropTypes from "prop-types";
import AddressListElement from "./AddressListElement";

/**
 * Liste des adresses utilisateur.
 * @param {{ addresses: array, onEdit: func, onDelete: func }} props
 */
const AddressList = ({ addresses, onEdit, onDelete }) => (
  <div
    id="address-list"
    className="container-profile-section border border-slate-200 rounded-2xl gap-4 p-4"
  >
    {addresses.length > 0 ? (
      <ul>
        {addresses.map((addr) => (
          <AddressListElement
            key={addr.id}
            address={addr}
            onEdit={() => onEdit(addr)}
            onDelete={() => onDelete(addr.id)}
          />
        ))}
      </ul>
    ) : (
      <p>Non renseigné</p>
    )}
  </div>
);

AddressList.propTypes = {
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      postcode: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default AddressList;
