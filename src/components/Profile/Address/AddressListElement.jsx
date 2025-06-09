import PropTypes from "prop-types";
import CTAButton from "../../shared/buttons/CTAButton";

const AddressListElement = ({
  address,
  handleDeleteAddress,
  setEditingAddress,
  setShowForm,
}) => {
  return (
    <>
      <li key={address.id} className="flex flex-col gap-2">
        <p>
          <strong>Nom :</strong> <span>{address.name}</span>
        </p>
        <p>
          <strong>Ville :</strong> <span>{address.city}</span>
        </p>
        <p>
          <strong>Code postal :</strong> <span>{address.postcode}</span>
        </p>
        <p>
          <strong>Pays :</strong> <span>{address.country}</span>
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
        <div className="w-full flex items-center gap-4 my-2 justify-end">
          <CTAButton
            label="Modifier"
            handleClick={() => {
              setEditingAddress(address);
              setShowForm(true);
            }}
            className="cta-warning"
            aria-label="Modifier l'adresse"
          />
          <CTAButton
            label="Supprimer"
            handleClick={() => handleDeleteAddress(address.id)}
            className="cta-danger"
            aria-label="Supprimer l'adresse"
          />
        </div>
      </li>
    </>
  );
};
AddressListElement.propTypes = {
  address: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    city: PropTypes.string,
    postcode: PropTypes.string,
    country: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleDeleteAddress: PropTypes.func.isRequired,
  setEditingAddress: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default AddressListElement;
