import PropTypes from "prop-types";
import CardCategory from "./CardCategory";

const GridCategories = ({ data }) => {
  // 1.States
  // 2.Functions
  // 3.Others

  // 4.Render
  return (
    //📌à changer pour disposition grid et non plus en stack
    <div
      id="containerGridCategories"
      className="w-full flex justify-center bg-pink-500 p-6"
    >
      <div
        id="gridCategories"
        className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 max-w-7xl w-full items-stretch"
      >
        {data.map((element) => (
          <CardCategory element={element} key={element.id} />
        ))}
      </div>
    </div>
  );
};

GridCategories.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default GridCategories;
