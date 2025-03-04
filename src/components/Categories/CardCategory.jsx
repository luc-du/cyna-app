import PropTypes from "prop-types";
import { Link } from "react-router";
import useSortedServices from "../../hooks/useSortedServices";
import FooterCardCategory from "./FooterCardCategory";

const CardCategory = ({ element }) => {
  // 1.States
  // 2.Functions
  // 3.Others
  const sortedProducts = useSortedServices(element);
  // 4.Render
  return (
    <>
      {" "}
      <Link
        to={`/categories/${element.url}`}
        key={element.id}
        className="block hover:scale-105 transition-transform"
      >
        <div
          id="cardCategory"
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl w-full min-h-full flex flex-col"
        >
          <div className="flex flex-col flex-grow p-4">
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
              </header>
              <div id="contentCard" className=" flex flex-grow bg-orange-500">
                <p className="text-gray-600 text-center flex-grow">
                  {element.description}
                </p>
              </div>
              <FooterCardCategory element={sortedProducts} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

CardCategory.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardCategory;
