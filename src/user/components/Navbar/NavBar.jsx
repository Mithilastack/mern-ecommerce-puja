// NavBar.jsx
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CartContext } from "../../../Contexts/CartContext";

const NavBar = () => {
  const { cart } = useContext(CartContext);
  // const { cart } = useCartContext();

  const [isOpen, setIsOpen] = useState(false);

  const ToggleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const ToggleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 relative">
      <div className="container mx-auto flex justify-between p-5 items-center">
        <Link to="/">
          <h3 className="font-bold text-2xl">
            Puja<span className="text-red-500">Vivah</span>
          </h3>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center text-lg font-semibold">
            <Link to="/">
              <li className="mr-5 hover:text-gray-900 cursor-pointer">Home</li>
            </Link>
            <Link to="/allproducts">
              <li className="mr-5 hover:text-gray-900 cursor-pointer">
                All Products
              </li>
            </Link>
          
            
            <Link to="/contactus">
              <li className="mr-5 hover:text-gray-900 cursor-pointer">Contact Us</li>
            </Link>
          </ul>
        </nav>

        {isOpen && (
          <div>
            <ul className="flex flex-col gap-10 text-2xl absolute top-[73px] left-0 h-screen w-full z-10 bg-red-500 text-white items-center justify-center font-semibold overflow-y-auto">
              <Link to="/" onClick={ToggleClose}>
                <li className="hover:text-gray-300">Home</li>
              </Link>
              <Link to="/allproducts" onClick={ToggleClose}>
                <li className="hover:text-gray-300">All Products</li>
              </Link>
              
              <Link to="/contactus" onClick={ToggleClose}>
                <li className="hover:text-gray-300">Contact Us</li>
              </Link>
            </ul>
            <button
              aria-label="Close menu"
              className="absolute top-[75px] z-10 right-0 text-white py-2 px-4 cursor-pointer"
              onClick={ToggleClose}
            >
              <IoClose size={30} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Link to="/login">
            <button className="font-semibold bg-gray-100 py-2 px-4 hover:bg-gray-200 rounded">
              Login
            </button>
          </Link>

          <Link to="/cart">
            <div className="relative flex items-center cursor-pointer">
              <div className="relative">
                <FaShoppingCart
                  size={25}
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>
          </Link>

          {!isOpen && (
            <button
              aria-label="Open menu"
              className="md:hidden"
              onClick={ToggleOpen}
            >
              <IoMdMenu size={28} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
