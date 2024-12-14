import React, { useState, useEffect } from "react";

const ItemsTable = ({ items, selectedItems, onUpdateTotalPrice }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [quantities, setQuantities] = useState(
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity || 1 }), {})
  );

  // Calculate total price based on selected items and their quantities
  const calculateTotalPrice = () => {
    let total = 0;
    items.forEach((item) => {
      if (selectedItems[item.id]) {
        total += item.price * (quantities[item.id] || 1);
      }
    });
    return total;
  };

  const handleItemSelection = (itemId) => {
    const updatedSelectedItems = {
      ...selectedItems,
      [itemId]: !selectedItems[itemId],
    };
    onUpdateTotalPrice(updatedSelectedItems, quantities); // Update total with selected items and their quantities
  };

  const handleToggleDetails = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleQuantityChange = (itemId, change) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(1, (prev[itemId] || 1) + change);
      const updatedQuantities = { ...prev, [itemId]: newQuantity };
      onUpdateTotalPrice(selectedItems, updatedQuantities); // Update the total price with new quantity
      return updatedQuantities;
    });
  };

  // Update the total price whenever the selected items or quantities change
  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    onUpdateTotalPrice(selectedItems, quantities, totalPrice);
  }, [selectedItems, quantities, items, onUpdateTotalPrice]);

  return (
    <div className="overflow-x-auto">
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
              Quantity
            </th>
            <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
              Select
            </th>
            <th className="py-3 px-6 text-center text-sm font-semibold text-gray-600">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.length > 0 ? (
            items.map((item) => (
              <React.Fragment key={item.id}>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-800">{item.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    ₹{item.price * (quantities[item.id] || 1)}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span>{quantities[item.id] || 1}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-500">
                    <input
                      type="checkbox"
                      checked={selectedItems[item.id] || false}
                      onChange={() => handleItemSelection(item.id)}
                      className="form-checkbox h-5 w-5 ml-3 text-red-500 rounded focus:ring-red-500 transition duration-150 ease-in-out cursor-pointer"
                    />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => handleToggleDetails(item.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedItems[item.id] ? "▲" : "▼"}
                    </button>
                  </td>
                </tr>
                {expandedItems[item.id] && (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-4 px-6 bg-gray-50 text-gray-600"
                    >
                      <p>
                        <strong>Description:</strong> {item.description}
                      </p>
                      <p>
                        <strong>Available Quantity:</strong> {item.quantity}
                      </p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No items available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;
