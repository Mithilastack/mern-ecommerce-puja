import React, { useState } from "react";
import { FaPen, FaTrash, FaSave } from "react-icons/fa"; // Font Awesome icons

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: "John Doe", status: "Pending", total: 100 },
    { id: 2, customerName: "Jane Smith", status: "Completed", total: 200 },
    { id: 3, customerName: "Alice Brown", status: "Shipped", total: 150 },
    // Add more orders for testing
  ]);

  const [editingOrder, setEditingOrder] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Status options
  const statusOptions = ["Pending", "Completed", "Shipped", "Cancelled"];

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Get current page orders
  const currentOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Edit Button Click
  const handleEdit = (order) => {
    setEditingOrder(order);
    setEditedOrder({ ...order });
  };

  // Handle Change in Edited Order
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Save Edits
  const handleSave = () => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === editedOrder.id ? editedOrder : order
      )
    );
    setEditingOrder(null);
  };

  // Handle Delete Order
  const handleDelete = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  // Handle pagination change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-16">
      <div className="flex justify-between align-middle mb-6">
        <h2 className="text-4xl font-semibold text-gray-900">Orders</h2>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto border-collapse text-gray-900">
          <thead className="bg-indigo-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer Name</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-200 transition duration-200 ease-in-out"
              >
                <td className="px-6 py-4">
                  {editingOrder?.id === order.id ? (
                    <input
                      type="text"
                      name="id"
                      value={editedOrder.id}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    order.id
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingOrder?.id === order.id ? (
                    <input
                      type="text"
                      name="customerName"
                      value={editedOrder.customerName}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    order.customerName
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingOrder?.id === order.id ? (
                    <select
                      name="status"
                      value={editedOrder.status}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {statusOptions.map((status, index) => (
                        <option key={index} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  ) : (
                    order.status
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingOrder?.id === order.id ? (
                    <input
                      type="text"
                      name="total"
                      value={editedOrder.total}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    order.total
                  )}
                </td>
                <td className="px-6 py-4 flex items-center space-x-10">
                  {editingOrder?.id === order.id ? (
                    <button
                      onClick={handleSave}
                      className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md focus:outline-none transition duration-200"
                    >
                      <FaSave size={20} />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(order)}
                        className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
                      >
                        <FaPen size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out ml-4"
                      >
                        <FaTrash size={20} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md transition duration-200 hover:bg-indigo-700 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md transition duration-200 hover:bg-indigo-700 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Orders;
