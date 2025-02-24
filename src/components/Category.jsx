import { Link } from "react-router-dom";

const Category = ({ name, url, imageUrl, products }) => {
  return (
    <div className="w-full relative w-64 h-80 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <Link to={`/categories/${url}`}>
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
      </Link>

      <div
        id="products"
        className="flex flex-col flex-wrap justify-evenly gap-6 m-6"
      >
        {products.map((product, index) => (
          <Link key={index} to={`/categories/${url}/${index}`}>
            <div className="flex items-center justify-evenly">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-10 h-10 rounded-lg object-cover cursor-pointer hover:scale-110 transition"
                title={product.name}
              />
              <span>{product.name}</span>
              <span>{product.prix}€</span>
              <span
                className={`font-bold ${
                  product.disponible ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.disponible ? "Dispo" : "Indispo"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
