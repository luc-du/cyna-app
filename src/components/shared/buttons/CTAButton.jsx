import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CTAButton = ({
  type = "button",
  variant = "primary",
  className,
  link,
  label,
  handleClick,
  disabled = false,
  ...props
}) => {
  // Styles par variante
  const getVariantStyles = () => {
    const baseStyles =
      "flex items-center justify-center max-w-xs w-full px-6 py-3 rounded-md font-semibold transition";

    const variants = {
      primary: "text-white bg-primary hover:bg-CTAHover disabled:bg-gray-400",
      secondary:
        "text-gray-700 bg-gray-200 hover:bg-gray-300 border border-gray-300",
      success: "text-white bg-green-600 hover:bg-green-700",
      danger: "text-white bg-red-600 hover:bg-red-700",
    };

    return `${baseStyles} ${variants[variant] || variants.primary}`;
  };

  const finalClassName = className || getVariantStyles();

  // Si c'est un lien (navigation)
  if (link) {
    return (
      <Link
        to={link}
        className={finalClassName}
        onClick={handleClick}
        {...props}
      >
        {label}
      </Link>
    );
  }

  // Si c'est un bouton (action/soumission)
  return (
    <button
      type={type}
      className={finalClassName}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

CTAButton.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "success", "danger"]),
  className: PropTypes.string,
  handleClick: PropTypes.func,
  link: PropTypes.string,
  label: PropTypes.any.isRequired,
  disabled: PropTypes.bool,
};

export default CTAButton;
