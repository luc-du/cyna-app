import { Link } from "react-router";
import { MOCK_Categories } from "../mock/MOCK_Categories";

const categoryData = MOCK_Categories;

export default function Categories() {
  return (
    <div className="grid grid-cols-1 gap-8 px-4 m-8 max-w-4xl mx-auto">
      {categoryData.map((category) => (
        <Link
          to={`/categories/${category.url}`}
          key={category.id}
          className="block hover:scale-105 transition-transform"
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl">
            <figure>
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-64 object-cover"
              />
            </figure>
            <div className="p-4">
              <header>
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
                  {category.name}
                </h1>
              </header>
              <footer>
                <ul className="text-gray-600 text-sm space-y-2">
                  {category.products.map((item) => (
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
      ))}
    </div>
  );
}
