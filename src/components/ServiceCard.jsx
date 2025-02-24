import React from "react";
import { Link } from "react-router";

const ServiceCard = ({ imageUrl, name, description, url }) => {
  return (
    <div className="w-80 h-96 bg-white shadow-lg rounded-xl p-4 text-center flex flex-col">
      <div className="h-35 w-full overflow-hidden">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-gray-600 text-sm my-2 line-clamp-3 overflow-ellipsis overflow-hidden">
            {description}
          </p>
        </div>
        <Link
          to={`/categories/${url}`}
          className="text-blue-500 font-semibold hover:underline mt-auto"
        >
          En savoir plus
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
