import React from "react";
import { Link } from "react-router-dom";

const CardBestseller = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
      <img
        src={image}
        alt={`Image of ${title}`}
        className="w-full h-56 object-cover rounded-t-xl"
      />
      <div className="p-6">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to={`/productview/${title.replace(/\s+/g, '-').toLowerCase()}`}>
          <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Add to Cart
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardBestseller;
