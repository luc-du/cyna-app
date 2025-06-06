import PropTypes from "prop-types";
import { emptyBox } from "../../assets/indexImages";

const NoResult = ({ message = "Aucun résultat trouvé" }) => {
  return (
    <div className="text-center mt-10 text-gray-500">
      <img src={emptyBox} alt={message} className="mx-auto mb-4 w-24 h-24" />
      <p className="mt-10 text-center text-gray-500">{message}</p>
    </div>
  );
};

export default NoResult;

NoResult.propTypes = {
  message: PropTypes.string.isRequired,
};
