import PropTypes from "prop-types";
import CTAButton from "../ui/buttons/CTAButton";

const PaymentMethodsSection = ({ data }) => {
  // 1.States
  // 2.Functions
  // 3.Others

  // 4.Render

  return (
    <>
      {/* Méthode de paiement*/}
      <div id="payment_methods" className="container-profile-section">
        <h2 className="text-xl">Méthodes de paiement</h2>
        {
          /* Afficher 2 CB */
          <ul>
            {data.cards?.length > 0
              ? data.cards.map((card, index) => {
                  <li key={index}>{card}</li>;
                })
              : "Non renseigné"}
          </ul>
        }
        <div className="container-cta">
          <CTAButton label="Modifier" className="cta-profile-style" />
        </div>
      </div>
    </>
  );
};
PaymentMethodsSection.propTypes = {
  data: PropTypes.shape({
    cards: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default PaymentMethodsSection;
