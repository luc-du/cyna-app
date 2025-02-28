import PropTypes from "prop-types";
import { Link } from "react-router";
import FooterCardCategory from "./FooterCardCategory";

const CardCategory = ({ element }) => {
  // 1.States
  // 2.Functions
  // 3.Others

  // 4.Render
  return (
    <>
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
            <header>
              <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
                {element.name}
              </h1>
            </header>
            <footer>
              <FooterCardCategory element={element} key={element.id} />
            </footer>
          </div>
        </div>
      </Link>
    </>
  );
};
CardCategory.propTypes = {
  element: PropTypes.shape({
    url: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
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
