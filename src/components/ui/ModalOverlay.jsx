import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const ModalOverlay = ({ children, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      aria-label="Fenêtre modale"
    >
      <div
        className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg p-6 w-full max-w-[calc(100vw-4rem)] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[95vh] flex flex-col sm:max-h-[80vh] sm:my-6 my-4"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={0}
      >
        <div className="flex items-center justify-end flex-shrink-0">
          <CTAButton
            onClick={onClose}
            className="flex items-center justify-center
              bg-red-50 dark:bg-red-200/20 hover:bg-red-100 dark:hover:bg-red-300/30
              text-red-500 hover:text-red-600
              p-1.5 w-8 h-8 rounded-full
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-400"
            aria-label="Fermer la modale"
            label={<IoClose className="w-5 h-5" />}
          />
        </div>
        <div className="sm:max-h-[60vh] overflow-y-auto flex-grow mt-4 pr-2 pb-4">
          {children}
        </div>
      </div>
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
