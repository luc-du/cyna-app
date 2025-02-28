import PropTypes from "prop-types";
import { Link } from "react-router";

const CardCategory = ({ element }) => {
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
              <ul className="text-gray-600 text-sm space-y-2">
                {element.products.map((item) => (
                  <Link to={`/products/${item.id}`} key={item.id}>
                    <li className="m-2 p-2 border rounded-lg bg-amber-100 hover:bg-amber-200 transition">
                      <p className="flex justify-between items-center">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-12 rounded object-center object-cover"
                        />
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-blue-600 font-bold">
                          {item.prix} €
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-md ${
                            item.disponible
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {item.disponible ? "Disponible" : "Indisponible"}
                        </span>
                      </p>
                    </li>
                  </Link>
                ))}
              </ul>
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
