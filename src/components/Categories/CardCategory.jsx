import PropTypes from "prop-types";
import { Link } from "react-router";
import FooterCardCategory from "./FooterCardCategory";

const CardCategory = ({ element }) => {
  // 1.States
  // 2.Functions
  // 3.Others

  const sortedProducts = [...element.products].sort((a, b) => {
    if (a.disponible === b.disponible) {
      return a.priorite - b.priorite;
    }
    return b.disponible - a.disponible;
  });

  // 4.Render
  return (
    <div
      id="cardCategory"
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl w-full min-h-full flex flex-col"
    >
      {" "}
      <Link
        to={`/categories/${element.url}`}
        key={element.id}
        className="block hover:scale-105 transition-transform"
      >
        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl">
          <div className="p-4">
            <figure>
              <img
                src={element.imageUrl}
                alt={element.name}
                className="w-full h-64 object-cover rounded-md"
              />
            </figure>
            <div className="p-4 flex flex-col flex-grow">
              <header>
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
                  {element.name}
                </h1>
                <p className="text-gray-600 text-center flex-grow">
                  {element.description}
                </p>
              </header>
              <footer className="mt-auto">
                <FooterCardCategory element={sortedProducts} />
              </footer>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
CardCategory.propTypes = {
  element: PropTypes.shape({
    url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        prix: PropTypes.number.isRequired,
        disponible: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default CardCategory;
