import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { useState } from "react";
import ModalOverlay from "../ui/ModalOverlay";
import { formatPhone } from "../utils/formatPhone";
import PersonalInfoForm from "./PersonalInfo/PersonalInfoForm";

/**
 * ProfileSection
 * Affiche et permet la modification des informations personnelles de l'utilisateur.
 * Accessible : gestion ARIA et focus.
 * @component
 * @param {Object} props
 * @param {Object} props.userData - Données de l'utilisateur à afficher.
 * @param {Function} props.onUpdateProfile - Callback pour mettre à jour le profil utilisateur.
 * @param {Function} props.showToast - Fonction pour afficher les notifications.
 * @returns {JSX.Element}
 */
const ProfileSection = ({ userData, onUpdateProfile, showToast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { lastname, firstname, email, phone, roles } = userData;

  /**
   * Démarre le mode édition.
   */
  const handleStartEdit = () => setIsEditing(true);

  /**
   * Annule le mode édition.
   */
  const handleCancelEdit = () => setIsEditing(false);

  /**
   * Sauvegarde les modifications du profil.
   * @async
   * @param {Object} formData - Données du formulaire.
   */
  const handleSave = async (formData) => {
    try {
      await onUpdateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      showToast("Erreur lors de la mise à jour du profil", "error");
    }
  };

  const formatName = (name) =>
    name[0].toUpperCase() + name.slice(1).toLowerCase();

  /**
   * Traduit le rôle utilisateur en français.
   * @param {string} role - Rôle brut.
   * @returns {string}
   */
  const formatUserRole = (role) =>
    role === "USER" ? "Membre" : "Administrateur";

  if (!userData) {
    return (
      <div
        id="profile-personal-info"
        className="container-profile-section"
        aria-busy="true"
        aria-live="polite"
      >
        <p>Chargement des informations...</p>
      </div>
    );
  }

  return (
    <section
      id="profile-personal-info"
      className="container-profile-section border border-slate-200 rounded-2xl gap-4 p-4"
      aria-labelledby="profile-section-title"
      tabIndex={-1}
    >
      <h2 className="text-xl mb-4" id="profile-section-title" tabIndex={0}>
        Informations personnelles
      </h2>

      <p className="mt-4">
        <strong>Nom :</strong>{" "}
        <span aria-label="Nom utilisateur">{formatName(lastname)}</span>
      </p>

      <p className="mt-4">
        <strong>Prénom :</strong>{" "}
        <span aria-label="Prénom utilisateur">{formatName(firstname)}</span>
      </p>

      <p className="mt-4">
        <strong>Email :</strong> <span aria-label="Adresse email">{email}</span>
      </p>

      <p className="mt-4">
        <strong>Téléphone :</strong>{" "}
        <span aria-label="Numéro de téléphone">
          {phone ? formatPhone(phone) : "Non renseigné"}
        </span>
      </p>

      <p className="mt-4">
        <strong>Statut :</strong>{" "}
        <span aria-label="Statut utilisateur">{formatUserRole(roles)}</span>
      </p>

      <div className="container-cta mt-4">
        <CTAButton
          label="Modifier"
          className="underline"
          handleClick={handleStartEdit}
          aria-label="Modifier les informations personnelles"
        />
      </div>

      {isEditing && (
        <ModalOverlay
          onClose={handleCancelEdit}
          aria-modal="true"
          role="dialog"
          aria-labelledby="edit-profile-title"
          tabIndex={-1}
        >
          <PersonalInfoForm
            userData={userData}
            onSave={handleSave}
            onCancel={handleCancelEdit}
            showToast={showToast}
          />
        </ModalOverlay>
      )}
    </section>
  );
};

ProfileSection.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    roles: PropTypes.string.isRequired,
  }).isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
};

export default ProfileSection;
