import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../../data/data"; // Named import

const ITEMS_PER_PAGE = 6; // Number of items per page

const Bestseller = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the start and end index of items for the current page
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <div className="mt-8 px-4 md:px-16 mb-20">
      <div className="flex justify-center items-center  p-6 rounded-lg">
        <h4 className="text-4xl font-extrabold text-red-500 uppercase">
          PUJA PACKAGES
        </h4>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-0">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              className="relative bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
              key={item.id}
            >
              <Link
                to={`/packageview/${item.id}`}
                className="block relative rounded overflow-hidden"
              >
                <img
                  alt={item.title}
                  className="object-cover object-center w-full h-44 md:h-52 bg-gray-100"
                  src={item.image}
                  loading="lazy"
                />
              </Link>
              <div className="p-3">
                <h3 className="text-gray-700 text-sm font-medium truncate">
                  {item.title}
                </h3>
                <p className="text-gray-900 text-sm font-semibold mt-1">
                  ₹{item.price}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Ratings:{" "}
                  <span className="text-yellow-500 font-bold">
                    {item.rating ? item.rating.toFixed(1) : "No ratings yet"} ★
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-2 md:col-span-3">
            No products available
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-3">
        <button
          className={`px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition duration-200 ease-in-out ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium text-gray-600 border border-transparent rounded-md transition duration-200 ease-in-out hover:border-gray-300 hover:bg-gray-100 ${
              currentPage === index + 1
                ? "bg-gray-300 text-gray-700"
                : "bg-transparent"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 transition duration-200 ease-in-out ${
            currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Bestseller;
