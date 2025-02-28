import PropTypes from "prop-types";
import { Link } from "react-router";

const CTAButton = ({ style, link, label }) => {
  // 1.States
  // 2.Functions
  // 3.Others
  const defaultStyle =
    "mt-4 w-full px-4 py-2 rounded-md text-white font-semibold transition bg-primary hover:bg-CTAHover";
  // 4.Render
  return (
    <button type="button" className={`${defaultStyle} ${style || ""}`}>
      <Link to={link}>{label}</Link>
    </button>
  );
};
CTAButton.propTypes = {
  style: PropTypes.string,
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CTAButton;
