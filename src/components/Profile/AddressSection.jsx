import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import CTAButton from "../ui/buttons/CTAButton";

const AddressSection = ({ data }) => {
  // 1.States
  const { list, loading, error } = useSelector((state) => state.address);

  console.log("From AddresseSection:", list);
  console.log("From AddresseSection:", loading);
  console.log("From AddresseSection:", error);

  if (!list || list === undefined || list.length === 0) {
    console.log("La liste d'addresses est vide");
  } else {
    console.log(list);
  }

  // 2.Functions
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
          /* Afficher 2 adresses */
          <ul>
            {data.addresses?.length > 0
              ? data.addresses.map((address, index) => (
                  <li key={index}>
                    <p>
                      <strong>Adresse :</strong>
                      {address.street}, {address.city} ({address.zipcode})
                    </p>
                  </li>
                ))
              : "Non renseigné"}
          </ul>
        )}

        <div className="w-full flex items-center justify-end">
          <CTAButton
            label="Modifier"
            className={
              "mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
            }
          />
        </div>
      </div>
    </>
  );
};
AddressSection.propTypes = {
  data: PropTypes.shape({
    addresses: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default AddressSection;
