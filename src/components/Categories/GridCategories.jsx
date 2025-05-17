import PropTypes from "prop-types";
import CardCategory from "./CardCategory";

const GridCategories = ({ data }) => {
  // 1.States
  // 2.Functions
  // 3.Others
  // 4.Render
  return (
    <>
      <div
        id="containerGridCategories"
        className="w-full flex flex-wrap justify-center m-6"
      >
        <h1 className="w-full text-center">Catégories</h1>
        <div
          id="gridCategories"
          className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 max-w-7xl w-full items-stretch min-h-[300px]"
        >
          {data.length > 0 ? (
            data.map((element) => (
              <CardCategory element={element} key={element.id} />
            ))
          ) : (
            <h2 className="text-xl text-center text-gray-500 col-span-full self-center">
              Oups, provisoirement vide !
            </h2>
          )}
        </div>
      </div>
    </>
  );
};

GridCategories.propTypes = {
  data: PropTypes.array.isRequired,
};

export default GridCategories;
