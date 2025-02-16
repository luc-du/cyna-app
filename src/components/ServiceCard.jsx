import React from "react";

const ServiceCard = ({ image, title, description, link }) => {
  return (
    <div className="w-80 h-96 bg-white shadow-lg rounded-xl p-4 text-center flex flex-col">
      <div className="h-35 w-full overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600 text-sm my-2 line-clamp-3 overflow-ellipsis overflow-hidden">
            {description}
          </p>
        </div>
        <a
          href={link}
          className="text-blue-500 font-semibold hover:underline mt-auto"
        >
          En savoir plus
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
