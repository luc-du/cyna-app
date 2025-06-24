import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { useState } from "react";
import CGV from "../Legal/CGV";
import ModalOverlay from "../ui/ModalOverlay";

/**
 * Composant TermsAgreement permet aux utilisateurs de consulter et d'accepter les conditions générales.
 * Il inclut une case à cocher pour l'accord et un bouton pour afficher les conditions complètes dans une modale.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {boolean} props.hasAgreedToTerms - Indique si l'utilisateur a accepté les conditions générales.
 * @param {function(Event): void} props.onTermsChange - Fonction de rappel déclenchée lorsque la case d'accord change.
 * @returns {JSX.Element} Le composant TermsAgreement rendu.
 */
const TermsAgreement = ({ hasAgreedToTerms, onTermsChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section
      className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-6"
      aria-labelledby="terms-agreement-title"
    >
      <h2
        id="terms-agreement-title"
        className="text-xl font-semibold mb-4 text-gray-800 dark:text-white"
      >
        Conditions Générales de Vente
      </h2>
      <div className="flex items-center space-x-4 mb-4">
        <label
          htmlFor="terms-agreement-checkbox"
          className="text-gray-700 dark:text-gray-300 cursor-pointer"
        >
          Accepter les C.G.V
        </label>
        <input
          type="checkbox"
          name="terms-agreement"
          id="terms-agreement-checkbox"
          checked={hasAgreedToTerms}
          onChange={onTermsChange}
          aria-describedby="terms-agreement-description"
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
        />
      </div>
      {/* Texte descriptif caché pour les lecteurs d'écran */}
      <p id="terms-agreement-description" className="sr-only">
        Veuillez cocher cette case pour indiquer votre acceptation de nos
        Conditions Générales de Vente.
      </p>

      <div className="flex items-center justify-end">
        <CTAButton
          handleClick={openModal}
          className="underline text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
          label="Voir les C.G.V"
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
        />
      </div>

      {isModalOpen && (
        <ModalOverlay onClose={closeModal}>
          <CGV isInModal={true} />
        </ModalOverlay>
      )}
    </section>
  );
};

TermsAgreement.propTypes = {
  hasAgreedToTerms: PropTypes.bool.isRequired,
  onTermsChange: PropTypes.func.isRequired,
};

export default TermsAgreement;
