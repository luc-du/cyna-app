import { Link } from "react-router";

const Category = ({ name, url }) => {
  return (
    <Link to={url}>
      <div className="flex flex-col items-center justify-center">
        <div id="shade" className="w-16 h-16 bg-purple-800 rounded-full"></div>
        <footer>
          <p className="text-purple-300 mt-2">{name}</p>
        </footer>
      </div>
    </Link>
  );
};

export default Category;
