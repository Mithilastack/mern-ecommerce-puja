import React, { useState } from "react";
import { FaPen, FaTrash, FaSave } from "react-icons/fa"; // Font Awesome icons

const Customers = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "johndoe@gmail.com", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "janesmith@gmail.com", phone: "987-654-3210" },
    { id: 3, name: "Alice Brown", email: "alicebrown@gmail.com", phone: "555-123-4567" },
    // Add more customers for testing
  ]);

  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  // Get current page customers
  const currentCustomers = customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Edit Button Click
  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setEditedCustomer({ ...customer });
  };

  // Handle Change in Edited Customer
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Save Edits
  const handleSave = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === editedCustomer.id ? editedCustomer : customer
      )
    );
    setEditingCustomer(null);
  };

  // Handle Delete Customer
  const handleDelete = (customerId) => {
    setCustomers(customers.filter((customer) => customer.id !== customerId));
  };

  // Handle pagination change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-16">
      <div className="flex justify-between align-middle mb-6">
        <h2 className="text-4xl font-semibold text-gray-900">Customers</h2>
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto border-collapse text-gray-900">
          <thead className="bg-indigo-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Customer ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b hover:bg-gray-200 transition duration-200 ease-in-out"
              >
                <td className="px-6 py-4">
                  {editingCustomer?.id === customer.id ? (
                    <input
                      type="text"
                      name="id"
                      value={editedCustomer.id}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    customer.id
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingCustomer?.id === customer.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedCustomer.name}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    customer.name
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingCustomer?.id === customer.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editedCustomer.email}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    customer.email
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingCustomer?.id === customer.id ? (
                    <input
                      type="text"
                      name="phone"
                      value={editedCustomer.phone}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    customer.phone
                  )}
                </td>
                <td className="px-6 py-4 flex items-center space-x-10">
                  {editingCustomer?.id === customer.id ? (
                    <button
                      onClick={handleSave}
                      className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md focus:outline-none transition duration-200"
                    >
                      <FaSave size={20} />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(customer)}
                        className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
                      >
                        <FaPen size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
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

export default Customers;
