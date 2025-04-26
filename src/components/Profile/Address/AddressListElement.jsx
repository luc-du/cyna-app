import PropTypes from "prop-types";
import CTAButton from "../../ui/buttons/CTAButton";

const AddressListElement = ({
  address,
  index,
  handleDeleteAddress,
  setEditingAddress,
  setShowForm,
}) => {
  return (
    <>
      <li key={address.id}>
        <h3>{index === 0 ? "Adresse principale" : "Adresse secondaire"}</h3>
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
        <div className="w-full flex items-center gap-2 my-2 justify-evenly">
          <CTAButton
            label="Supprimer"
            className="mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-red-600 hover:text-white transition"
            handleClick={() => handleDeleteAddress(address.id)}
          />
          <CTAButton
            label="Modifier"
            className="mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
            handleClick={() => {
              setEditingAddress(address);
              setShowForm(true);
            }}
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
