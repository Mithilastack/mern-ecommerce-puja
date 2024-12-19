import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-lg font-bold mt-5 ml-2">Admin Panel</div>
      <nav className="flex-grow">
        <ul className="space-y-2 p-4">
          <li>
            <Link
              to="/admin"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/customers"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              Customers
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              className="block px-4 py-2 hover:bg-gray-700 rounded"
            >
              Categories
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
