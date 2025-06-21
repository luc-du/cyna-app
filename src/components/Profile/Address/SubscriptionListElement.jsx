import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import CTAButton from "../../shared/buttons/CTAButton";
import DownloadInvoiceButton from "../../shared/buttons/DownloadInvoiceButton";
import {
  renderSubscriptionStatus,
  setMappedDate,
} from "../../utils/stripe/stripeUtils";

const SubscriptionListElement = ({ sub, onModify, onCancel, loading }) => {
  const date = setMappedDate(sub);
  const status = renderSubscriptionStatus(sub.status);
  const user = useSelector((state) => state.user.user);

  return (
    <li
      key={sub.subscriptionId}
      className="border rounded-lg p-4 bg-white dark:bg-white/10 shadow-sm hover:shadow-md transition dark:text-black"
    >
      <dl className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <dt className="font-semibold">Date de souscription</dt>
          <dd>{date}</dd>
        </div>
        <div>
          <dt className="font-semibold">Produit</dt>
          <dd>{sub.productName}</dd>
        </div>
        <div>
          <dt className="font-semibold">Montant</dt>
          <dd>{sub.amount} €</dd>
        </div>
        <div>
          <dt className="font-semibold">Statut</dt>
          <dd>{status}</dd>
        </div>
      </dl>
      <div className="flex items-center justify-end space-x-4">
        <DownloadInvoiceButton
          date={date}
          subscription={sub}
          user={user}
          key={sub.subscriptionId}
        />
        <CTAButton
          handleClick={onModify}
          label="Modifier"
          className="underline"
          disabled={loading}
          aria-label={`Modifier l'abonnement ${sub.productName}`}
        />
        <CTAButton
          handleClick={() => onCancel(sub.subscriptionId, sub.productName)}
          label="Résilier"
          className="cta-danger"
          disabled={loading}
          aria-label={`Résilier l'abonnement ${sub.productName}`}
        />
      </div>
    </li>
  );
};

export default SubscriptionListElement;

SubscriptionListElement.propTypes = {
  sub: PropTypes.shape({
    subscriptionId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  onModify: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
