import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import ModalOverlay from "../../ui/ModalOverlay";
import PasswordForm from "./PasswordForm";

/**
 * Section de changement de mot de passe.
 *
 * @component
 * @param {Object} props
 * @param {number|string} props.userId           I
 * @param {Function} props.onChangePassword
 * @param {Function} props.showToast
 */
const PasswordSection = ({ userId, onChangePassword, showToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Wrap du submit pour fermer le modal sur succès
  const handleSubmit = async (payload) => {
    try {
      await onChangePassword(payload);
      closeModal();
    } catch {
      // l’erreur est déjà affichée par showToast dans le parent
    }
  };

  return (
    <section
      role="region"
      aria-labelledby="password-section-title"
      className="container-profile-section border border-slate-200 rounded-2xl p-4 my-4"
      tabIndex={-1}
    >
      <h2 id="password-section-title" className="text-xl font-semibold mb-2">
        Changement de mot de passe
      </h2>

      <div className="flex items-center justify-end mt-4">
        <CTAButton
          label="Modifier"
          className={"underline"}
          handleClick={openModal}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        />
      </div>

      {isOpen && (
        <ModalOverlay
          onClose={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="password-modal-title"
          className="max-w-md"
        >
          <div ref={dialogRef} tabIndex={-1} className="outline-none">
            <h3 id="password-modal-title" className="text-2xl font-bold mb-4">
              Modifier le mot de passe
            </h3>

            <PasswordForm
              userId={userId}
              onChangePassword={handleSubmit}
              showToast={showToast}
              onCancel={() => setIsOpen(false)}
            />
          </div>
        </ModalOverlay>
      )}
    </section>
  );
};

PasswordSection.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChangePassword: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
};

export default PasswordSection;
