import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FooterCardCategory = ({ element }) => {
  // 1.States
  // 2.Functions
  const navigate = useNavigate();
  // 3.Others

  return (
    <>
      <ul className="text-gray-600 text-sm space-y-2">
        {element.products.map((item) => (
          <li
            key={item.id}
            className="m-2 p-2 border rounded-lg bg-amber-100 hover:bg-amber-200 transition cursor-pointer"
            onClick={() => navigate(`/products/${item.id}`)}
          >
            <p className="flex justify-between items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-12 rounded object-center object-cover"
              />
              <span className="font-semibold">{item.name}</span>
              <span className="text-blue-600 font-bold">{item.prix} €</span>
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
        ))}
      </ul>
    </>
  );
};
FooterCardCategory.propTypes = {
  element: PropTypes.shape({
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

export default FooterCardCategory;
