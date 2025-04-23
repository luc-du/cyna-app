import PropTypes from "prop-types";
import AddressListElement from "./AddressListElement";

const AddressList = ({
  user,
  handleDeleteAddress,
  setEditingAddress,
  setShowForm,
}) => {
  return (
    <>
      <div id="address" className="container-profile-section">
        <h2 className="text-xl">Adresses</h2>

        <ul>
          {user?.addresses?.length > 0 ? (
            user.addresses.map((address) => (
              <AddressListElement
                key={address.id}
                address={address}
                index={address.id}
                setEditingAddress={setEditingAddress}
                handleDeleteAddress={handleDeleteAddress}
                setShowForm={setShowForm}
              />
            ))
          ) : (
            <li>Non renseigné</li>
          )}
        </ul>
      </div>
    </>
  );
};

AddressList.propTypes = {
  user: PropTypes.shape({
    addresses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        postcode: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        url: PropTypes.string,
      })
    ),
  }),
  handleDeleteAddress: PropTypes.func.isRequired,
  setEditingAddress: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default AddressList;
