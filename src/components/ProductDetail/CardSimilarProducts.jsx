import PropTypes from "prop-types";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import { MOCK_Services } from "../../mock/MOCKS_DATA";

const CardSimilarProducts = ({ item }) => {
  console.log("itemIndex:", item);

  /* => hook ? */
  const getServiceById = (serviceId) => {
    const service = MOCK_Services.find((service) => service.id === serviceId);
    if (!service) return null;

    return {
      ...service,
      pricingOptions: MOCK_Services.filter((option) =>
        service.pricingIds.includes(option.id)
      ),
    };
  };

  const findSimilarServices = getServiceById(item);

  return (
    <div
      key={getServiceById}
      className="border rounded-md p-4 shadow-md hover:shadow-lg transition"
    >
      <img
        src={findSimilarServices.imageUrl}
        alt={findSimilarServices.name}
        className="w-full h-32 object-cover rounded-md"
      />
      <h3 className="mt-2 text-lg font-semibold text-primary">
        {findSimilarServices.name}
      </h3>
      <div className="flex justify-end mt-2">
        <Link
          to={`/products/${findSimilarServices.id}`}
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
