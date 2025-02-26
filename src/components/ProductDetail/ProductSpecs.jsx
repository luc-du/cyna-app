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
        {/* Voir pour ajouter une key caractéristiques techniques */}

        {/* map sur caractéristiques */}
        <li className="font-bold">
          Performances:{" "}
          <span className="font-medium">
            {product.caracteristiques.performances}
          </span>
        </li>
        <li className="font-bold">
          Scalabilité:{" "}
          <span className="font-medium">
            {product.caracteristiques.scalabilite}
          </span>
        </li>
        <li className="font-bold">
          Niveau de support:{" "}
          <span className="font-medium">
            {product.caracteristiques.nvSupport}
          </span>
        </li>
      </ul>
    </div>
  );
};
ProductSpecs.propTypes = {
  product: PropTypes.shape({
    caracteristiques: PropTypes.shape({
      performances: PropTypes.string.isRequired,
      scalabilite: PropTypes.string.isRequired,
      nvSupport: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductSpecs;
