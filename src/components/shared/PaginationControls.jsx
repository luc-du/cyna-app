import { setCurrentPage } from "@slices/searchSlice";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import CTAButton from "./buttons/CTAButton";

/**
 * Composant de pagination simple avec navigation précédente/suivante.
 */
export default function PaginationControls({ currentPage, totalPages }) {
  const dispatch = useDispatch();

  const handlePrev = () => {
    if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNext = () => {
    if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
  };

  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-8 flex justify-center items-center space-x-4"
      aria-label="Pagination"
    >
      <CTAButton
        type="button"
        label="Précédent"
        handleClick={handlePrev}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm border rounded-lg shadow-sm dark:text-white dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      />

      <span className="text-sm text-gray-800 dark:text-gray-200">
        Page <strong>{currentPage}</strong> / {totalPages}
      </span>

      <CTAButton
        type="button"
        label="Suivant"
        handleClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm border rounded-lg shadow-sm dark:text-white dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </nav>
  );
}

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
