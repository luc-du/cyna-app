import PropTypes from "prop-types";
import CTAButton from "../ui/buttons/CTAButton";

const ProfileSection = ({ data }) => {
  // 1.States
  // 2.Functions
  // 3.Others

  // 4.Render
  return (
    <>
      {/* Informations utilisateur */}
      <div id="personal-informations" className="container-profile-section">
        <h2 className="text-xl">Informations personnelles</h2>
        <p>
          <strong>Nom :</strong> {data.firstname} {""} {data.lastname}
        </p>
        <p>
          <strong>Email :</strong> {data.email}
        </p>
        <p>
          <strong>Téléphone :</strong> {data.phone || "Non renseigné"}
        </p>
        <p>
          <strong>Rôle :</strong> {data.roles ? "Client" : "Administrateur"}
        </p>

        <div className="container-cta ">
          <CTAButton label="Modifier" className="cta-profile-style" />
        </div>
      </div>
    </>
  );
};

ProfileSection.propTypes = {
  data: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string,
    roles: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProfileSection;
