import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress } from "../../redux/slice/addressSlice";
import AddAddressForm from "../Address/AddressForm";
import CTAButton from "../ui/buttons/CTAButton";

const AddressSection = ({ data }) => {
  // 1.States
  const { list, loading, error } = useSelector((state) => state.address);
  console.log("Data", data);
  console.log("Liste d'adresse", data.addresses);
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();

  if (!list || list.length === 0) {
    console.log("La liste d'addresses est vide");
  } else {
    console.log(list);
  }

  // 2.Functions
  const toggleForm = () => {
    setShowForm(!showForm);
    console.log(showForm);
  };

  const handleDeleteAddress = async (addressId) => {
    const userConfirmed = window.confirm(
      "Voulez-vous réellement supprimer cette adresse ?"
    );
    if (!userConfirmed) return;

    try {
      await dispatch(deleteAddress(addressId)).unwrap();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };
  // 3.Others
  return (
    <>
      {/* Adresses */}
      <div id="address" className="container-profile-section">
        <h2 className="text-xl">Adresses</h2>
        {error && <p className="error-feedback">{error}</p>}
        {console.log("From fallback error", error)}

        {/* FAllback loading */}
        {loading ? (
          <h2 className="loading-feedback">Chargement en cours ...</h2>
        ) : (
          /* Afficher les adresses */
          <ul>
            {data.addresses?.length > 0
              ? data.addresses.map((address, index) => (
                  <li key={address.id}>
                    <h3>
                      {index === 0
                        ? "Adresse principale"
                        : "Adresse secondaire"}
                    </h3>
                    <p>
                      <strong>Nom :</strong>
                      <span> {address.name}</span>
                    </p>
                    <p>
                      <strong>Ville :</strong> <span>{address.city}</span>
                    </p>
                    <p>
                      <strong>Code postal :</strong>
                      <span> {address.postcode}</span>
                    </p>
                    <p>
                      <strong>Pays :</strong>
                      <span> {address.country}</span>
                    </p>
                    <p>
                      <strong>
                        <a href={address.url}>
                          <span className="text-violet-600">Google map</span>
                        </a>
                      </strong>
                    </p>{" "}
                    <div className="w-full flex items-center gap-2 my-2 justify-evenly">
                      <CTAButton
                        label="Supprimer"
                        className={
                          "mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-red-600 hover:text-white transition"
                        }
                        handleClick={() => handleDeleteAddress(address.id)}
                      />
                      <div className="w-full flex items-center gap-2 my-2 justify-end">
                        <CTAButton
                          label="Modifier"
                          className={
                            "mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
                          }
                        />
                      </div>
                    </div>
                  </li>
                ))
              : "Non renseigné"}
          </ul>
        )}

        <div className="w-full flex items-center gap-2 my-2 justify-end">
          <CTAButton
            label="Ajouter une addresse"
            className={
              "mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
            }
            handleClick={toggleForm}
          />
        </div>
        {showForm && <AddAddressForm />}
      </div>
    </>
  );
};

AddressSection.propTypes = {
  data: PropTypes.shape({
    addresses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        city: PropTypes.string,
        postcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        country: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    address: PropTypes.object,
  }).isRequired,
};

export default AddressSection;
