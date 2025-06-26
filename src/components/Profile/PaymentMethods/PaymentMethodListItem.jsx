import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { useState } from "react";
import ConfirmModal from "../../ui/ConfirmModal";
import setCardIcon from "../../utils/setCardIcon";

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
  const CardIcon = setCardIcon(type);
  return (
    <>
      <li className="flex flex-wrap items-center justify-between bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition">
        <div className="flex items-center space-x-4 ml-4">
          <CardIcon className="w-10 h-10 object-contain text-black" />
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
          {!isDefault && (
            <CTAButton
              handleClick={() => onSetDefault(method.id)}
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
        <div className="w-full my-2">
          {isDefault && <p className="text-green-500 ">Carte par défaut</p>}
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
