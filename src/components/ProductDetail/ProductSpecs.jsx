// 1.State :
// 2.Functions:
// 3. Others
import PropTypes from "prop-types";

// Render
const ProductSpecs = ({ product }) => {
  return (
    <div className="mt-6 p-2 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold text-center text-primary">
        Caractéristiques techniques
      </h2>
      <ul>
        {/* map sur caractéristiques */}
        <li className="font-bold">
          performance:{" "}
          <span className="font-medium">
            {product.keyCharacteristics.performance}
          </span>
        </li>
        <li className="font-bold">
          Scalabilité:{" "}
          <span className="font-medium">
            {product.keyCharacteristics.scalability}
          </span>
        </li>
        <li className="font-bold">
          Niveau de support:{" "}
          <span className="font-medium">
            {product.keyCharacteristics.support}
          </span>
        </li>
      </ul>
    </div>
  );
};
ProductSpecs.propTypes = {
  product: PropTypes.shape({
    keyCharacteristics: PropTypes.shape({
      performance: PropTypes.string.isRequired,
      scalability: PropTypes.string.isRequired,
      support: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductSpecs;
