import PropTypes from "prop-types";
import { Link } from "react-router";

const CTAButton = ({ style, link, label }) => {
  // 1.States
  // 2.Functions
  // 3.Others
  const defaultStyle =
    "flex items-center justify-center max-w-xs w-full px-6 py-3 rounded-md text-white font-semibold transition bg-primary hover:bg-CTAHover";
  // 4.Render
  return (
    <div className="flex items-center justify-center">
      <button type="button" className={`${defaultStyle} ${style || ""}`}>
        <Link to={link}>{label}</Link>
      </button>
    </div>
  );
};
CTAButton.propTypes = {
  style: PropTypes.string,
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CTAButton;
