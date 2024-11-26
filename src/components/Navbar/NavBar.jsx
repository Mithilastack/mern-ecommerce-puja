import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const NavBar = () => {

  // console.log(cart)

  const [isOpen, setIsOpen] = useState(false);

  // Toggle Open for Menu
  const ToggleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling when menu is open
  };

  // Toggle Close for Menu
  const ToggleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto"; // Enable scrolling when menu is closed
  };

  // Cleanup overflow on unmount or state change
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"; // Reset overflow on unmount
    };
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 relative">
      <div className="container mx-auto flex justify-between p-5 items-center">
        {/* Logo */}
        <Link to="/">
          <h3 className="font-bold text-2xl">
            Puja<span className="text-red-500">Vivah</span>
          </h3>
        </Link>

        {/* Desktop Menu */}
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
            <li className="mr-5 hover:text-gray-900 cursor-pointer">Shadi</li>
            <li className="mr-5 hover:text-gray-900 cursor-pointer">Contact</li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div>
            <ul className="flex flex-col gap-10 text-2xl absolute top-[73px] left-0 h-screen w-full z-10 bg-red-500 text-white items-center justify-center font-semibold overflow-y-auto">
              <Link to="/" onClick={ToggleClose}>
                <li className="hover:text-gray-300">Home</li>
              </Link>
              <Link to="/allproducts" onClick={ToggleClose}>
                <li className="hover:text-gray-300">All Products</li>
              </Link>
              <li className="hover:text-gray-300" onClick={ToggleClose}>
                Shadi
              </li>
              <li className="hover:text-gray-300" onClick={ToggleClose}>
                Contact
              </li>
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

        {/* Cart and Login */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <button
              aria-label="Login"
              className="font-semibold bg-gray-100 py-2 px-4 hover:bg-gray-200 rounded"
            >
              Login
            </button>
          </Link>

          <Link to="/cart">
            <div className="relative flex items-center cursor-pointer">
              <FaShoppingCart size={25} />
              
            </div>
          </Link>

          {/* Hamburger Menu Button */}
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
