import PropTypes from "prop-types";

const CategoryDescription = ({ element }) => {
  return (
    <>
      {" "}
      <h2>Description du service</h2>
      <p className="mt-2 text-gray-700">{element.description}</p>
    </>
  );
};
CategoryDescription.propTypes = {
  element: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryDescription;
