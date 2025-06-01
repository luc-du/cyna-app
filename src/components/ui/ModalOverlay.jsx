import PropTypes from "prop-types";

/**
 * ModalOverlay
 *
 * Composant pour afficher une fenêtre modale avec une superposition sombre.
 *
 * Props :
 * - children : contenu à afficher dans la modale.
 * - onClose : fonction appelée lors de la fermeture de la modale (clic sur l'arrière-plan ou touche Échap).
 *
 * Accessibilité :
 * - Utilise les rôles et attributs ARIA pour indiquer une boîte de dialogue modale.
 * - Ferme la modale avec la touche Échap.
 */
import { useEffect, useRef } from "react";

const ModalOverlay = ({ children, onClose }) => {
  const modalRef = useRef(null);

  // Gestion de la touche Échap pour fermer la modale
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus automatique sur la modale à l'ouverture
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      aria-label="Fenêtre modale"
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture lors d'un clic à l'intérieur de la modale
        ref={modalRef}
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
};

ModalOverlay.propTypes = {
  /** Contenu à afficher dans la modale */
  children: PropTypes.node.isRequired,
  /** Fonction appelée lors de la fermeture de la modale */
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
