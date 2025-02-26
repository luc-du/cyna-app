import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const SimilarProducts = ({ similar }) => {
  if (!similar || similar.length === 0) {
    return <p>Aucun produit similaire trouvé</p>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-center text-primary mb-4">
        Services Similaires
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {similar.map((item) => (
          <div
            key={item.id}
            className="border rounded-md p-4 shadow-md hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <h3 className="mt-2 text-lg font-semibold text-primary">
              {item.name}
            </h3>
            <div className="flex justify-end mt-2">
              <Link
                to={`/products/${item.id}`}
                className="text-primary flex items-center hover:text-blue-700 transition duration-300 hover:translate-x-1"
              >
                Voir <FaArrowRight className="ml-1" />
              </Link>
            </div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

SimilarProducts.propTypes = {
  similar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SimilarProducts;
