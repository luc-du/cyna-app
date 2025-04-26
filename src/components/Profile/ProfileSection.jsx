import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../redux/slice/authSlice";
import CTAButton from "../ui/buttons/CTAButton";
import PersonalInfoForm from "./PersonalInfo/PersonalInfoForm";

const ProfileSection = ({ data }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveProfile = async (formData) => {
    try {
      await dispatch(
        updateUserProfile({ userId: data.id, profileData: formData })
      ).unwrap();
      await dispatch(fetchUserProfile());
      setIsEditing(false);
      alert("Informations mises à jour !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur lors de la mise à jour du profil");
    }
  };

  if (!data || loading) {
    return (
      <div id="personal-informations" className="container-profile-section">
        <p>Chargement des informations...</p>
      </div>
    );
  }

  const mapUserRole = (value) => {
    if (value === "User") {
      return "Membre";
    } else {
      return "Administrateur";
    }
  };

  return (
    <div id="personal-informations" className="container-profile-section">
      <h2 className="text-xl mb-4">Informations personnelles</h2>

      {isEditing ? (
        <PersonalInfoForm
          userData={data}
          onSave={handleSaveProfile}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <p>
            <strong>Nom :</strong> {data.firstname} {data.lastname}
          </p>
          <p>
            <strong>Email :</strong> {data.email}
          </p>
          <p>
            <strong>Téléphone :</strong>{" "}
            {data.phone
              ? data.phone.toString().startsWith("0")
                ? data.phone
                : `0${data.phone}`
              : "Non renseigné"}
          </p>
          <p>
            <strong>Status :</strong>{" "}
            {mapUserRole(
              data?.roles?.slice(0, 1) + data?.roles?.slice(1).toLowerCase()
            )}
          </p>

          <div className="container-cta mt-4">
            <CTAButton
              label="Modifier"
              className="cta-profile-style"
              handleClick={handleEditClick}
            />
          </div>
        </>
      )}
    </div>
  );
};

ProfileSection.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    roles: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileSection;
