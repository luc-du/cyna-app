import { Link } from "react-router";

const Category = ({ name, url, imageUrl, products }) => {
  return (
    <Link to={url}>
      <div className="relative w-64 h-80 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
        {" "}
        <div className="relative w-full h-40 rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h2 className="text-lg font-bold text-white">{name}</h2>
          </div>
        </div>
        <div id="products" className="flex flex-wrap justify-center gap-2 mt-4">
          {products.map((product, index) => (
            <Link key={index} to={product.url}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-10 h-10 rounded-lg object-cover cursor-pointer hover:scale-110 transition"
                title={product.name}
              />
            </Link>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Category;
