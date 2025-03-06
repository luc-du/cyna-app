import PropTypes from "prop-types";

const NavigateButton = ({ handleClick, className, label }) => {
  // 1.States
  // 2.Functions
  // 3.Others

  const defaultStyle =
    "px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition";
  // 4.Render
  return (
    <button
      onClick={handleClick}
      className={className ? className : defaultStyle}
    >
      {label}
    </button>
  );
};

NavigateButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default NavigateButton;
