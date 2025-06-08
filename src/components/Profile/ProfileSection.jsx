import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../../hooks/useToast";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../redux/slice/userSlice";
import CTAButton from "../shared/buttons/CTAButton";
import ModalOverlay from "../ui/ModalOverlay";
import { formatPhone } from "../utils/formatPhone";
import PersonalInfoForm from "./PersonalInfo/PersonalInfoForm";

/**
 * ProfileSection
 * Composant affichant et permettant la modification des informations personnelles de l'utilisateur.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.data - Données de l'utilisateur à afficher.
 * @returns {JSX.Element}
 */
const ProfileSection = ({ data }) => {
  // 1. États :
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);

  const { showToast, ToastComponent } = useToast();

  // 2. Fonctions :

  /**
   * Active le mode édition.
   * @function
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * Annule le mode édition.
   * @function
   */
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  /**
   * Sauvegarde les modifications du profil utilisateur.
   * @async
   * @function
   * @param {Object} formData - Données du formulaire à sauvegarder.
   */
  const handleSaveProfile = async (formData) => {
    console.log(formData);

    try {
      console.log("[DISPATCH] updateUserProfile...");

      await dispatch(
        updateUserProfile({ userId: data.id, updates: formData })
      ).unwrap();
      await dispatch(fetchUserProfile());
      setIsEditing(false);
      showToast("Informations mises à jour !");
      console.log("[DEBUG] handleSaveProfile called with:", formData);
      console.log("Mise à jour effectuée👍");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      showToast("Erreur lors de la mise à jour du profil", "error");
    }
  };

  /**
   * Traduit le rôle utilisateur en français.
   * @function
   * @param {string} value - Rôle utilisateur.
   * @returns {string}
   */
  const mapUserRole = (value) => {
    if (value === "USER") {
      return "Membre";
    } else {
      return "Administrateur";
    }
  };

  // 3. Affichage pendant le chargement ou absence de données
  if (!data || loading) {
    return (
      <div
        id="personal-informations"
        className="container-profile-section"
        aria-busy="true"
        aria-live="polite"
      >
        <p>Chargement des informations...</p>
      </div>
    );
  }

  // 4. Rendu principal :
  return (
    <>
      {/* Composant Toast pour les notifications */}
      <ToastComponent />
      <div
        id="personal-informations"
        className="container-profile-section"
        aria-labelledby="profile-section-title"
        tabIndex={-1}
      >
        <div className="container-profile-section">
          <h2 className="text-xl mb-4" id="personal-info-title">
            Informations personnelles
          </h2>

          <p>
            <strong>Nom :</strong> <span aria-label="Nom">{data.lastname}</span>
          </p>
          <p>
            <strong>Prénom :</strong>{" "}
            <span aria-label="Prénom">{data.firstname}</span>
          </p>
          <p>
            <strong>Email :</strong>{" "}
            <span aria-label="Adresse email">{data.email}</span>
          </p>
          <p>
            <strong>Téléphone :</strong>{" "}
            <span aria-label="Numéro de téléphone">
              {data.phone ? formatPhone(data.phone) : "Non renseigné"}
            </span>
          </p>
          <p>
            <strong>Status :</strong>{" "}
            <span aria-label="Statut utilisateur">
              {mapUserRole(data.roles)}
            </span>
          </p>

          <div className="container-cta mt-4">
            <CTAButton
              label="Modifier"
              className="cta-profile-style"
              handleClick={handleEditClick}
              aria-label="Modifier les informations personnelles"
            />
          </div>
        </div>

        {/* Modal d'édition des informations personnelles */}
        {isEditing && (
          <ModalOverlay
            onClose={handleCancelEdit}
            aria-modal="true"
            role="dialog"
            aria-labelledby="edit-profile-title"
            tabIndex={-1}
          >
            <PersonalInfoForm
              userData={data}
              onSave={handleSaveProfile}
              onCancel={handleCancelEdit}
            />
          </ModalOverlay>
        )}
      </div>
    </>
  );
};

/**
 * Définition des PropTypes pour la validation des props du composant ProfileSection.
 */
ProfileSection.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    roles: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileSection;
