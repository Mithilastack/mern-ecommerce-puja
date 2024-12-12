import React from "react";

const ItemsTable = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-start bg-white shadow rounded-lg p-4"
        >
          <input
            type="checkbox"
            className="h-5 w-5 text-red-500 focus:ring-red-400 mr-4"
          />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              {item.name}
            </h4>
            <p className="text-gray-500 text-sm">{item.description}</p>
            <span className="text-gray-600 text-sm">{item.quantity}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsTable;
