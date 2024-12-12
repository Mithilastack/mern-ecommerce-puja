import React from "react";
import { Link } from "react-router-dom";
import banner2 from "../assets/images/banner-2.jpeg";

// Named export for products
import { products } from "../../../data/data"; // Named import

// Default export for Bestseller component
const Bestseller = () => {
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
        {products.length > 0 ? (
          products.map((item) => (
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
                {/* <button
                  className="text-black w-[40%] px-1 py-2 text-sm mt-10 rounded border border-black hover:bg-red-500 hover:text-white hover:border-white transition duration-200"
                  onClick={() => console.log(`Added ${item.title} to cart`)}
                >
                  Add to cart
                </button> */}
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Bestseller;
