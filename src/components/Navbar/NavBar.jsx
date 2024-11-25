import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const NavBar = () => {
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
      document.body.style.overflow = "auto"; // Ensure overflow is reset when component unmounts
    };
  }, []);

  return (
    <>
      <div>
        <header className="bg-white border-b border-gray-200 relative">
          <div className="container mx-auto flex justify-between p-5 items-center">
            <div>
              <Link to="/">
                <h3 className="font-bold text-2xl">
                  Puja<span className="text-red-500">Vivah</span>
                </h3>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <ul className="flex items-center text-lg justify-center font-semibold">
                <Link to="/">
                  <li className="mr-5 hover:text-gray-900 cursor-pointer">
                    Home
                  </li>
                </Link>
                <Link to="/allproducts">
                  <li className="mr-5 hover:text-gray-900 cursor-pointer">
                    All Products
                  </li>
                </Link>
                <li className="mr-5 hover:text-gray-900 cursor-pointer">
                  Shadi
                </li>
                <li className="mr-5 hover:text-gray-900 cursor-pointer">
                  Contact
                </li>
              </ul>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div>
                <ul className="flex flex-col gap-10 text-2xl absolute top-[73px] left-0 h-screen w-full z-10 bg-red-500 text-white items-center justify-center font-semibold overflow-y-auto">
                  <Link to="/" onClick={ToggleClose}>
                    <li className="mr-5 hover:text-gray-900 cursor-pointer">
                      Home
                    </li>
                  </Link>
                  <Link to="/allproducts" onClick={ToggleClose}>
                    <li className="mr-5 hover:text-gray-900 cursor-pointer">
                      All Products
                    </li>
                  </Link>
                  <Link to="/shadi" onClick={ToggleClose}>
                    <li className="mr-5 hover:text-gray-900 cursor-pointer">
                      Shadi
                    </li>
                  </Link>
                  <Link to="/contact" onClick={ToggleClose}>
                    <li className="mr-5 hover:text-gray-900 cursor-pointer">
                      Contact
                    </li>
                  </Link>
                </ul>
                <button className="absolute top-[75px] z-10 right-0 text-white py-2 px-4 cursor-pointer">
                  <IoClose size={30} onClick={ToggleClose} />
                </button>
              </div>
            )}

            {/* Shopping Cart and Login Buttons */}
            <div className="flex justify-center items-center gap-3">
              <Link to="/login">
                <button className="font-semibold bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base">
                  Login
                </button>
              </Link>

              <Link to="/cart">
                <button className="flex justify-center items-center">
                  <FaShoppingCart size={25} />
                </button>
              </Link>

              {/* Hamburger Menu Button */}
              {!isOpen && (
                <button className="md:hidden" onClick={ToggleOpen}>
                  <IoMdMenu size={28} />
                </button>
              )}
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default NavBar;
