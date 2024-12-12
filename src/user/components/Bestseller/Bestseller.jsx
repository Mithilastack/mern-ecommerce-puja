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
      <div className="flex items-center mb-8">
        <h2 className="text-2xl font-bold text-center">PUJA PACKAGES</h2>
        <Link to="/allproducts" className="ml-auto">
          <span className="text-blue-500 hover:underline cursor-pointer">
            View All Packages
          </span>
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-3 mb-9 ml-5 mr-9">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div
              className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-3xl cursor-pointer"
              key={item.id}
            >
              <Link
                to={`/packageview/${item.id}`}
                className="block relative h-48 rounded overflow-hidden"
              >
                <img
                  alt={item.title}
                  className="object-cover object-center w-full h-full block bg-transparent"
                  src={item.image}
                />
              </Link>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold">${item.price}</p>
                  <p className="mt-1 text-xs text-gray-600 font-medium">
                    Ratings:{" "}
                    <span className="text-yellow-400 bg-gray-100 rounded px-1 py-1 font-bold">
                      {item.rating ? item.rating.toFixed(1) : "No ratings yet"}{" "}
                      ★
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
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
