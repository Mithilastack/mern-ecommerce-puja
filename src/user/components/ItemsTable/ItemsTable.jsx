import React, { useState } from "react";

const ItemsTable = ({ items, selectedItems, onUpdateTotalPrice }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const handleItemSelection = (itemId) => {
    const updatedSelectedItems = {
      ...selectedItems,
      [itemId]: !selectedItems[itemId],
    };
    onUpdateTotalPrice(updatedSelectedItems);
  };

  const handleToggleDetails = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <table className="min-w-full bg-white shadow-md rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
            Item
          </th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
            Price
          </th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
            Select
          </th>
          <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
            Details
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <tr className="hover:bg-gray-50">
              <td className="py-4 px-6 text-sm text-gray-800">{item.name}</td>
              <td className="py-4 px-6 text-sm text-gray-500">₹{item.price}</td>
              <td className="py-4 px-6 text-sm text-gray-500">
                <input
                  type="checkbox"
                  checked={selectedItems[item.id] || false}
                  onChange={() => handleItemSelection(item.id)}
                  className="form-checkbox h-5 w-5 text-red-500 rounded focus:ring-red-500 transition duration-150 ease-in-out"
                />
              </td>
              <td className="py-4 px-6 text-sm text-gray-500">
                <button
                  onClick={() => handleToggleDetails(item.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {expandedItems[item.id] ? "▲" : "▼"} {/* Down/Up arrow */}
                </button>
              </td>
            </tr>

            {/* Collapsible Item Details */}
            {expandedItems[item.id] && (
              <tr>
                <td colSpan="4" className="py-4 px-6 bg-gray-50 text-gray-600">
                  <div>
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default ItemsTable;
