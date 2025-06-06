import PropTypes from "prop-types";
import CTAButton from "../shared/buttons/CTAButton";

const LogoutButton = ({ handleClick }) => {
  // 1.States
  // 2.Functions
  // 3.Others

  // 4.Render

  return (
    <div>
      {/* LogoutButton */}
      <div className="w-full flex items-center justify-center">
        <CTAButton
          label="Se déconnecter"
          className={
            "btn mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
          }
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
