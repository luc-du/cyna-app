import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import ModalOverlay from "./ModalOverlay";

/**
 * Composant modale de confirmation.
 * Par défaut : Annuler / Confirmer (ex: suppression).
 * Personnalisable pour d'autres contextes.
 *
 * @param {string} title - Titre de la modale
 * @param {string} message - Message de confirmation
 * @param {Function} onConfirm - Callback en cas de validation
 * @param {Function} onCancel - Callback en cas d’annulation
 * @param {string} [confirmLabel="Confirmer"] - Libellé bouton valider
 * @param {string} [cancelLabel="Annuler"] - Libellé bouton annuler
 * @param {string} [confirmClass="cta-danger"] - Classe CSS bouton confirmer
 * @param {string} [cancelClass="underline text-gray-700"] - Classe CSS bouton annuler
 * @returns {JSX.Element}
 */
export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  confirmClass = "cta-danger",
  cancelClass = "underline text-gray-700",
}) {
  return (
    <ModalOverlay onClose={onCancel}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        className="p-6 max-w-sm mx-auto"
      >
        <h3 id="confirm-modal-title" className="text-lg font-semibold mb-4">
          {title}
        </h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <CTAButton
            handleClick={onCancel}
            label={cancelLabel}
            className={
              cancelClass +
              "dark:text-white hover:text-gray-900 dark:hover:text-gray-300"
            }
          />
          <CTAButton
            handleClick={onConfirm}
            label={confirmLabel}
            className={confirmClass}
          />
        </div>
      </div>
    </ModalOverlay>
  );
}

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  confirmClass: PropTypes.string,
  cancelClass: PropTypes.string,
};
