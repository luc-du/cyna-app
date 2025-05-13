import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CardCategory = ({ element }) => {
  const { id, name, description, images } = element;
  const navigate = useNavigate();

  const imageUrl =
    images?.[0]?.url || "https://via.placeholder.com/300x200?text=Aucune+image";

  const handleClick = () => {
    navigate(`/categories/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={imageUrl}
        alt={`Illustration de la catégorie ${name}`}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-bold mb-2">{name}</h2>
      <p className="text-sm text-gray-600 text-center">{description}</p>
    </div>
  );
};

CardCategory.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
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

export default CardCategory;
