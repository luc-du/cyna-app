// components/Profile/DeleteAccountButton.jsx
import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { useState } from "react";
import ConfirmModal from "../ui/ConfirmModal";

/**
 * Bouton avec modale de confirmation pour supprimer un compte utilisateur.
 * @param {{ onConfirm: Function }} props
 */
const DeleteAccountButton = ({ onConfirm }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <CTAButton
        label="Supprimer mon compte"
        className="cta-danger"
        handleClick={() => setShowModal(true)}
        aria-label="Demande de suppression de compte utilisateur"
      />

      {showModal && (
        <ConfirmModal
          title="Confirmer la suppression"
          message="Cette action est irréversible. Votre compte et vos données seront définitivement supprimés."
          onConfirm={() => {
            setShowModal(false);
            onConfirm?.();
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

DeleteAccountButton.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteAccountButton;
