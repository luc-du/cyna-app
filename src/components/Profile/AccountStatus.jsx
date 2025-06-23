import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";

const AccountStatus = ({ data }) => {
  // 1.States
  // 2.Functions
  // 3.Others
  let content;
  if (!data || data === undefined) {
    console;
    content =
      "Erreur lors de la récupération des informations de l'utilisateur";
  } else {
    /* Actif / Vérifié / Verrouillé + bouton vérifier */
    content = (
      <>
        <p
          className={`font-semibold ${
            data.enabled ? "text-green-600" : "text-red-600"
          }`}
        >
          {data.enabled ? "✔ Compte actif" : "❌ Compte désactivé"}
        </p>
        <p
          className={`font-semibold ${
            data.emailVerified ? "text-green-600" : "text-red-600"
          }`}
        >
          {data.emailVerified ? "✔ Email vérifié" : "❌ Email non vérifié"}
        </p>
        <div className="w-full flex items-center justify-end">
          <CTAButton
            label="Vérifier"
            className={
              "mt-2 px-4 py-2 border border-primaryBackground text-primaryBackground rounded-md hover:bg-primaryBackground hover:text-white transition"
            }
          />
        </div>
      </>
    );
  }

  // 4.Render

  return (
    <div id="account-status" className="mt-4 py-4 border-b-2">
      <h2 className="text-xl">État du compte</h2>
      {content}
    </div>
  );
};
AccountStatus.propTypes = {
  data: PropTypes.shape({
    enabled: PropTypes.bool.isRequired,
    emailVerified: PropTypes.bool.isRequired,
    accountNonLocked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default AccountStatus;
