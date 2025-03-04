import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FooterCardCategory = ({ element }) => {
  if (!element) {
    console.log(element);
  }
  // 1.States
  // 2.Functions
  const navigate = useNavigate();
  // 3.Others

  return (
    <footer
      id="FooterCardCategory"
      className="flex flex-grow flex-wrap justify-center gap-2 mt-6"
    >
      <ul className="w-full text-gray-600 text-sm space-y-2">
        {element.map((item) => (
          <li
            key={item.id}
            className={`m-2 p-2 border rounded-lg transition cursor-pointer ${
              item.available
                ? "bg-amber-100 hover:bg-amber-200"
                : "bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed"
            }`}
            onClick={() => item.available && navigate(`/products/${item.id}`)}
          >
            <p className="flex justify-between items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-12 h-12 rounded object-center object-cover"
              />
              <span className="font-semibold">{item.name}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-md ${
                  item.available
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.available ? "Disponible" : "Indisponible"}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </footer>
  );
};
FooterCardCategory.propTypes = {
  element: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default FooterCardCategory;
