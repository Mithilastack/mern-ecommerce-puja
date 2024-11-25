import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const ToggleOpen = () => {
    setIsOpen(true);
  };

  const ToggleClose = () => {
    setIsOpen(false);
  };

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

            {isOpen ? (
              <div>
                <ul className="flex flex-col gap-10 text-2xl absolute top-[73px] left-0 h-screen w-full z-10 bg-red-500 text-white items-center justify-center font-semibold">
                  <Link to="/">
                    <li className="mr-5 hover:text-gray-900 cursor-pointer">
                      Home
                    </li>
                  </Link>
                  <li className="mr-5 hover:text-gray-900 cursor-pointer">
                    All Products
                  </li>
                  <li className="mr-5 hover:text-gray-900 cursor-pointer">
                    Shadi
                  </li>
                  <li className="mr-5 hover:text-gray-900 cursor-pointer">
                    Contact
                  </li>
                </ul>
                <button className="absolute top-[75px] z-10 right-0 text-white py-2 px-4 cursor-pointer">
                  <IoClose size={30} onClick={ToggleClose} />
                </button>
              </div>
            ) : (
              ""
            )}

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

              {isOpen ? (
                ""
              ) : (
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
