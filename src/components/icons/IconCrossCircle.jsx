import PropTypes from "prop-types";

/**
 * IconCrossCircle renders a red cross inside a circle, typically used for error or close actions.
 *
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes for sizing and coloring the icon.
 */
const IconCrossCircle = ({ className = "h-12 w-12 text-red-500" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    {/* Outer circle with red fill */}
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="#fee2e2"
    />
    {/* First line of the cross */}
    <line x1="8" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="2" />
    {/* Second line of the cross */}
    <line x1="16" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="2" />
  </svg>
);

IconCrossCircle.propTypes = {
  className: PropTypes.string,
};

export default IconCrossCircle;
