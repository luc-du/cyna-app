import PropTypes from "prop-types";
import CTAButton from "../ui/buttons/CTAButton";

const ProductCard = ({ item }) => {
  const imageUrl =
    item.images?.[0]?.url ||
    "https://via.placeholder.com/300x200?text=Pas+d'image";

  const isAvailable = item.status === "AVAILABLE";

  return (
    <div
      id="card_product"
      className={`${
        isAvailable
          ? "bg-white rounded-lg shadow-md hover:shadow-2xl transition transform"
          : "bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed"
      }`}
    >
      <img
        src={imageUrl}
        alt={item.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>

        <div className="flex flex-col items-end justify-end">
          <span
            className={`block text-sm font-semibold m-2 ${
              isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {isAvailable ? "Disponible" : "Indisponible"}
          </span>
        </div>

        <div className="flex items-center justify-center my-2">
          {isAvailable && (
            <CTAButton
              link={`/products/${item.id}`}
              label="Voir le produit"
              style="bg-orange-500"
            />
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        url: PropTypes.string,
        uploadDate: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default ProductCard;
