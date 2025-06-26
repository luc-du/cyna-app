import CTAButton from "@shared/buttons/CTAButton";
import PropTypes from "prop-types";

const LogoutButton = ({ handleClick, style }) => {
  // 1.States
  // 2.Functions
  // 3.Others

  // 4.Render

  return (
    <div className="gap-4 p-4">
      {/* LogoutButton */}
      <div className="w-full flex items-center justify-center">
        <CTAButton
          label="Se déconnecter"
          className={style}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};
LogoutButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default LogoutButton;
