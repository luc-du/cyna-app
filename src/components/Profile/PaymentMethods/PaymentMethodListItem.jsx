import PropTypes from "prop-types";
import { useState } from "react";
import {
  FaCcMastercard as MastercardIcon,
  FaCcVisa as VisaIcon,
} from "react-icons/fa";
import CTAButton from "../../shared/buttons/CTAButton";
import ConfirmModal from "../../ui/ConfirmModal";

/**
 * Affiche une carte de paiement avec ses actions.
 */
const PaymentMethodListItem = ({
  method,
  onDelete,
  onSetDefault,
  deleting,
}) => {
  const { cardholderName, last4, expiryMonth, expiryYear, type, isDefault } =
    method;

  const [showConfirm, setShowConfirm] = useState(false);

  // Choix de l'icône selon le type
  const BrandIcon = type?.toLowerCase().includes("visa")
    ? VisaIcon
    : type?.toLowerCase().includes("master")
    ? MastercardIcon
    : null;

  return (
    <>
      <li className="flex items-center justify-between bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <div className="flex items-center space-x-4">
          {BrandIcon && <BrandIcon className="w-8 h-8" />}
          <div>
            <p className="font-medium text-gray-800">
              •••• <span className="font-mono">{last4}</span>
            </p>
            <p className="text-sm text-gray-500">
              Expiration{" "}
              <span className="font-mono">{`${expiryMonth
                ?.toString()
                .padStart(2, "0")}/${expiryYear?.toString().slice(-2)}`}</span>
            </p>
            {cardholderName && (
              <p className="text-sm text-gray-600 italic">{cardholderName}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isDefault && (
            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full mr-2">
              Par défaut
            </span>
          )}
          {!isDefault && (
            <CTAButton
              handleClick={onSetDefault}
              aria-label={`Définir la carte •••• ${last4} par défaut`}
              className="cta-success text-sm px-3 py-1"
              label="Défaut"
            />
          )}
          <CTAButton
            handleClick={() => setShowConfirm(true)}
            aria-label={`Supprimer la carte •••• ${last4}`}
            className="cta-danger text-sm px-3 py-1"
            label={deleting === method.id ? "Suppression…" : "Supprimer"}
            disabled={deleting === method.id}
          />
        </div>
      </li>
      {showConfirm && (
        <ConfirmModal
          title="Supprimer la carte ?"
          message={`Êtes-vous sûr de vouloir supprimer la carte •••• ${last4} ? Cette action est irréversible.`}
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            onDelete();
          }}
        />
      )}
    </>
  );
};
PaymentMethodListItem.propTypes = {
  method: PropTypes.shape({
    id: PropTypes.string.isRequired,
    cardholderName: PropTypes.string,
    last4: PropTypes.string.isRequired,
    expiryMonth: PropTypes.number.isRequired,
    expiryYear: PropTypes.number.isRequired,
    type: PropTypes.string,
    isDefault: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSetDefault: PropTypes.func.isRequired,
  deleting: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PaymentMethodListItem;
