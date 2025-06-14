import PropTypes from "prop-types";
import CTAButton from "../shared/buttons/CTAButton";
import ModalOverlay from "./ModalOverlay";

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
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
            label="Annuler"
            className="underline text-gray-700"
          />
          <CTAButton
            handleClick={onConfirm}
            label="Supprimer"
            className="cta-danger"
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
};
