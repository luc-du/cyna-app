import PropTypes from "prop-types";
import { getCategoryImageUrl } from "../utils/mediaService";

const CategoryHeader = ({ element, children }) => {
  console.log(element);
  const imageUrl = getCategoryImageUrl(element.images);

  return (
    <div className="text-center my-6">
      <div className="relative">
        <img
          src={element.images[0].url}
          alt={element.name}
          className="w-full max-h-96 object-cover rounded-lg shadow-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white transition transform hover:scale-105 hover:shadow-2xl">
            {element.name}
          </h1>
        </div>{" "}
      </div>
      {children}
    </div>
  );
};
CategoryHeader.propTypes = {
  element: PropTypes.shape({
    images: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};

export default CategoryHeader;
