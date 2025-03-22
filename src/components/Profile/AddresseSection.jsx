import PropTypes from "prop-types";
import CTAButton from "../ui/buttons/CTAButton";

const AddresseSection = ({ data }) => {
  // 1.States
  // 2.Functions
  // 3.Others

  return (
    <>
      {/* Adresses */}
      <div id="address" className="container-profile-section">
        <h2 className="text-xl">Adresses</h2>
        {
          /* Afficher 2 adresses */
          <ul>
            {data.addresses?.length > 0
              ? data.addresses.map((element, index) => {
                  <li key={index}>
                    <p>
                      <strong>Addresse :</strong>
                      {element}
                    </p>
                  </li>;
                })
              : "Non renseigné"}
          </ul>
        }

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
AddresseSection.propTypes = {
  data: PropTypes.shape({
    addresses: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default AddresseSection;
