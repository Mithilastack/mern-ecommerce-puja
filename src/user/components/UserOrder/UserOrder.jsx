// OrderComponent.js

import React from "react";

const UserOrder = ({ order }) => {
  return (
    <div className="border-b pb-4 mb-4">
      <p className="text-gray-700">
        <strong>Order ID:</strong> {order._id}
      </p>
      <p className="text-gray-700">
        <strong>Status:</strong> {order.status}
      </p>
      <p className="text-gray-700">
        <strong>Total Price:</strong> ₹{order.totalPrice}
      </p>
      <div>
        <h5 className="text-md font-semibold mt-2">Items:</h5>
        <ul className="list-disc pl-5">
          {order.items.map((item) => (
            <li key={item.productId} className="text-gray-700">
              {item.name} - ₹{item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserOrder;
