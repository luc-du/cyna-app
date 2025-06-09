import PropTypes from "prop-types";
import AddressListElement from "./AddressListElement";

const AddressList = ({
  user,
  addresses,
  handleDeleteAddress,
  setEditingAddress,
  setShowForm,
}) => {
  return (
    <>
      <div id="address" className="container-profile-section">
        <h2 className="text-xl">Adresses</h2>
        <ul>
          {user && addresses.length > 0 ? (
            addresses.map((address) => (
              <AddressListElement
                key={address.id}
                address={{
                  ...address,
                  postcode: String(address.postcode),
                }}
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

AddressList.prototype = {
  user: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addresses: PropTypes.arrayOf({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleDeleteAddress: PropTypes.func.isRequired,
  setEditingAddress: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default AddressList;
