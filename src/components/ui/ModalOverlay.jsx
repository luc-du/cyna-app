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
import { IoClose } from "react-icons/io5";

const ModalOverlay = ({ children, onClose }) => {
  const modalRef = useRef(null);

  // Gestion de la touche Échap pour fermer la modale
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        alert("close me");
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
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={0}
      >
        <div className="flex items-center justify-end">
          <button
            onClick={onClose}
            className="flex items-center justify-center
            bg-red-50 hover:bg-red-100
            text-red-500 hover:text-red-600
            p-1.5 w-8 h-8 rounded-full
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-red-200"
            aria-label="Fermer la modale"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
