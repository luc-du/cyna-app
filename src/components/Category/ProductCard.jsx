import PropTypes from "prop-types";
import Placeholder from "../../assets/images/empty-box.jpg";
import CTAButton from "../ui/buttons/CTAButton";
import { getPromo } from "../utils/getMockData";
import { getCategoryImageUrl } from "../utils/mediaService";

const ProductCard = ({ item }) => {
  console.log(item);

  const imageUrl = getCategoryImageUrl(item.images.url) || Placeholder;

  const isAvailable = item.active;
  const promotion = item.promo || getPromo(item.id);

  return (
    <div
      id="card_product"
      className={`${
        item.active
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
        {promotion && (
          <div
            id="promo"
            className="w-full flex items-center justify-center mt-2"
          >
            <p className="block text-sm font-semibold text-center text-violet-600"></p>
          </div>
        )}
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
    active: PropTypes.bool.isRequired,
    promo: PropTypes.bool.isRequired,
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
