import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CTAButton = ({ className, link, label }) => {
  // 1.States
  // 2.Functions
  // 3.Others

  // 1. Définition des styles par défaut
  const defaultStyle =
    "flex items-center justify-center max-w-xs w-full px-6 py-3 rounded-md text-white font-semibold transition bg-primary hover:bg-CTAHover";

  return (
    <div className="flex items-center justify-center">
      <Link to={link} className={className ? className : defaultStyle}>
        {label}
      </Link>
    </div>
  );
};

CTAButton.propTypes = {
  className: PropTypes.string,
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default CTAButton;
