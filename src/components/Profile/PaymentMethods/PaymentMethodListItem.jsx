import classNames from "classnames";
import PropTypes from "prop-types";
import CTAButton from "../../shared/buttons/CTAButton";

/**
 * PaymentMethodListItem
 *
 * Affiche une carte bancaire avec actions.
 *
 * Props :
 * - id, brand, last4, expMonth, expYear, cardholderName, isDefault
 * - onDelete : fn(id)
 * - onSetDefault : fn(id)
 */
const PaymentMethodListItem = ({
  id,
  brand,
  last4,
  expMonth,
  expYear,
  cardholderName,
  isDefault,
  onDelete,
  onSetDefault,
}) => {
  const label = `${brand.toUpperCase()} •••• ${last4}`;
  const expiration = `Exp: ${expMonth.toString().padStart(2, "0")}/${expYear}`;

  return (
    <div
      className={classNames(
        "flex items-center justify-between p-4 bg-white rounded-lg shadow",
        { "border-2 border-blue-500": isDefault }
      )}
      aria-label={`${label}, ${expiration}${
        isDefault ? ", carte par défaut" : ""
      }`}
    >
      <div className="flex flex-col">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-gray-500">{expiration}</span>
        <span className="text-sm text-gray-500">{cardholderName}</span>
      </div>

      <div className="flex space-x-2">
        {!isDefault && (
          <CTAButton
            onClick={onSetDefault}
            label="Définir par défaut"
            aria-label={`Définir ${label} comme carte par défaut`}
          />
        )}
        <CTAButton
          onClick={onDelete}
          label="Supprimer"
          variant="danger"
          aria-label={`Supprimer ${label}`}
        />
      </div>
    </div>
  );
};

PaymentMethodListItem.propTypes = {
  id: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  last4: PropTypes.string.isRequired,
  expMonth: PropTypes.number.isRequired,
  expYear: PropTypes.number.isRequired,
  cardholderName: PropTypes.string,
  isDefault: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onSetDefault: PropTypes.func.isRequired,
};

export default PaymentMethodListItem;
