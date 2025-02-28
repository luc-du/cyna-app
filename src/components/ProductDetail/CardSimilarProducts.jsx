import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const CardSimilarProducts = ({ item }) => {
  return (
    <div
      key={item.id}
      className="border rounded-md p-4 shadow-md hover:shadow-lg transition"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-32 object-cover rounded-md"
      />
      <h3 className="mt-2 text-lg font-semibold text-primary">{item.name}</h3>
      <div className="flex justify-end mt-2">
        <Link
          to={`/products/${item.id}`}
          className="text-primary flex items-center hover:text-blue-700 transition duration-300 hover:translate-x-1"
        >
          Voir <FaArrowRight className="ml-1" />
        </Link>
      </div>{" "}
    </div>
  );
};
CardSimilarProducts.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardSimilarProducts;
