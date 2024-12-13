import React from "react";

const ItemsTable = ({ items, selectedItems, onUpdateTotalPrice }) => {
  const handleItemSelection = (itemId) => {
    const updatedSelectedItems = { ...selectedItems, [itemId]: !selectedItems[itemId] };
    onUpdateTotalPrice(updatedSelectedItems);
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="py-2 px-4 text-left">Item</th>
          <th className="py-2 px-4 text-left">Price</th>
          <th className="py-2 px-4 text-left">Select</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td className="py-2 px-4">{item.name}</td>
            <td className="py-2 px-4">₹{item.price}</td>
            <td className="py-2 px-4">
              <input
                type="checkbox"
                checked={selectedItems[item.id] || false}
                onChange={() => handleItemSelection(item.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemsTable;
