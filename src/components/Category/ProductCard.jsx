import PropTypes from "prop-types";
import CTAButton from "../ui/buttons/CTAButton";

const ProductCard = ({ item }) => {
  return (
    <div
      id="card_product"
      className={`${
        item.available
          ? "bg-white rounded-lg shadow-md hover:shadow-2xl transition transform"
          : "bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed"
      }`}
      key={item.id}
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>

        <div className="flex flex-col items-end justify-end">
          <span
            className={`block text-sm font-semibold m-2 ${
              item.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.available ? "Disponible" : "Indisponible"}
          </span>
        </div>
        <div className="flex items-center justify-center my-2">
          {item.available ? (
            <CTAButton
              link={`/products/${item.id}`}
              label="Voir le produit"
              style={`bg-orange-500`}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    available: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProductCard;
