import React, { useState, useEffect } from "react";

const ItemsTable = ({ items, onUpdateTotalPrice }) => {
  // State to track checked items
  const [checkedItems, setCheckedItems] = useState({});

  // Update total price based on selected items
  const updateTotalPrice = () => {
    const total = items.reduce((acc, item) => {
      if (checkedItems[item.id]) {
        return acc + item.price;
      }
      return acc;
    }, 0);
    onUpdateTotalPrice(total); // Pass total to parent
  };

  // Toggle the checkbox state when the card is clicked
  const handleCardClick = (id, price) => {
    setCheckedItems((prevState) => {
      const newState = {
        ...prevState,
        [id]: !prevState[id], // Toggle the checked state
      };

      // Update total price based on checked items
      updateTotalPrice();
      return newState;
    });
  };

  useEffect(() => {
    updateTotalPrice(); // Initialize total price when component mounts
  }, [checkedItems]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col bg-white shadow-sm rounded-lg p-4 cursor-pointer"
          onClick={() => handleCardClick(item.id, item.price)}
        >
          <div className="relative">
            {/* Checkbox on top of the image */}
            <input
              type="checkbox"
              checked={checkedItems[item.id] || false}
              onChange={() => handleCardClick(item.id, item.price)}
              className="h-5 w-5 text-gray-500 focus:ring-gray-300 absolute top-2 left-2"
            />

            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
          </div>

          {/* Item Details */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
            <p className="text-gray-500 text-sm">{item.description}</p>
            <span className="text-gray-600 text-sm">{item.quantity}</span>
            <div className="text-gray-800 font-semibold mt-2">₹{item.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsTable;
