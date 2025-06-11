import PropTypes from "prop-types";
import CTAButton from "../../shared/buttons/CTAButton";
/**
 * Un item de carte avec actions.
 */
const PaymentMethodListItem = ({ method, onDelete, onSetDefault }) => {
  const { cardholderName, last4, expiryMonth, expiryYear, type, isDefault } =
    method;

  return (
    <li className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
      <div>
        <p className="font-medium">
          {type} •••• {last4}
        </p>
        <p className="text-sm text-gray-600">
          Exp: {expiryMonth}/{expiryYear}{" "}
          {cardholderName && `— ${cardholderName}`}
        </p>
        {isDefault && (
          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
            Par défaut
          </span>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 gap-4">
        <CTAButton
          onClick={onDelete}
          aria-label={`Supprimer la carte ${last4}`}
          className={"cta-danger"}
          label={"Supprimer"}
        />
        {!isDefault && (
          <CTAButton
            handleClick={onSetDefault}
            aria-label={`Définir la carte ${last4} par défaut`}
            label={"Défaut"}
            className={"cta-success"}
          />
        )}
      </div>
    </li>
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
};

export default PaymentMethodListItem;
