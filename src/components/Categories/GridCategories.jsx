import PropTypes from "prop-types";
import CardCategory from "./CardCategory";

const GridCategories = ({ data }) => {
  // 1.States
  // 2.Functions
  // 3.Others

  // 4.Render
  return (
    <div className="grid grid-cols-1 gap-8 px-4 m-8 max-w-4xl mx-auto">
      {data.map((element) => (
        <CardCategory element={element} key={element.id} />
      ))}
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
