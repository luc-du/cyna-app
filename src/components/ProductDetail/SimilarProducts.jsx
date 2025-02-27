import PropTypes from "prop-types";
import CardSimilarProducts from "./CardSimilarProducts";

const SimilarProducts = ({ similar }) => {
  // 1.State:
  // 2.Functions:
  // 3.Others:

  // Render:
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
          <CardSimilarProducts item={item} key={item.id} />
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
