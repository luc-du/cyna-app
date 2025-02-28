import PropTypes from "prop-types";
import CTAButton from "../ui/buttons/CTAButton";

const ProductCard = ({ item }) => {
  return (
    <div
      id="card_product"
      className="bg-white rounded-lg shadow-md hover:shadow-2xl transition transform hover:scale-105"
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
          <span className="text-blue-600 font-bold">{item.prix} €</span>
          <span
            className={`block text-sm font-semibold mt-2 ${
              item.disponible ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.disponible ? "Disponible" : "Indisponible"}
          </span>
        </div>
        <CTAButton link={`/products/${item.id}`} label="Voir le produit" />
      </div>
    </div>
  );
};
ProductCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    prix: PropTypes.number.isRequired,
    disponible: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProductCard;
