import React from 'react';

const CardBestseller = ({ image, title, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-shadow hover:shadow-2xl">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
        <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default CardBestseller;
