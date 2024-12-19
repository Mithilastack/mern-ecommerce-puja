import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CartContext } from "../../../Contexts/CartContext";
import { useAuth } from "../../../Contexts/AuthContext"; // Import AuthContext

const NavBar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // For profile hover menu

  const ToggleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
  };

  const ToggleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto"; // Restore scrolling when menu is closed
  };

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Reset profile menu when logged out
    if (!user) {
      setIsProfileMenuOpen(false);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [user]); // Re-run on user change

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
              <li className="mr-5 hover:text-gray-900 cursor-pointer">
                Contact Us
              </li>
            </Link>
          </ul>
        </nav>

        {isOpen && (
          <div>
            <ul className="flex flex-col gap-10 text-2xl absolute top-[73px] left-0 h-screen w-full z-50 bg-red-500 text-white items-center justify-center font-semibold overflow-y-auto">
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

        <div className="flex items-center gap-3 relative">
          {/* Check if user is logged in */}
          {!user ? (
            <Link to="/login">
              <button className="font-semibold bg-gray-100 py-2 px-4 hover:bg-gray-200 rounded">
                Login
              </button>
            </Link>
          ) : (
            <>
              {/* Profile Icon with dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setIsProfileMenuOpen(true)} // Open the dropdown when hovering over the parent div
                onMouseLeave={() => setIsProfileMenuOpen(false)} // Close the dropdown when mouse leaves the parent div
              >
                <FaUserCircle
                  size={30}
                  className="text-gray-700 hover:text-gray-900 cursor-pointer"
                  onClick={() => navigate("/profile")} // Navigate to profile page
                />

                <div
                  className={`absolute right-0 bg-white shadow-2xl rounded-md  w-48 ${
                    isProfileMenuOpen ? "block" : "hidden"
                  } transition-all duration-200 ease-in-out`}
                  style={{
                    zIndex: 999, // Ensure dropdown is on top
                    position: "absolute", // Ensure absolute positioning for dropdown
                    top: "100%", // Ensure it opens just below the icon
                  }}
                  onMouseEnter={() => setIsProfileMenuOpen(true)} // Open menu when hovering over the dropdown itself
                  onMouseLeave={() => setIsProfileMenuOpen(false)} // Close menu when leaving the dropdown
                >
                  <Link to="/profile">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-md">
                      Go to Profile
                    </button>
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-md"
                    onClick={() => {
                      setIsProfileMenuOpen(false); // Close the menu after clicking logout
                      setTimeout(() => {
                        logout(); // Log the user out after closing the menu
                        navigate("/"); // Navigate to home after logout
                      }, 100); // Add a small delay to ensure the menu closes first
                    }}
                  >
                    Logout
                  </button>
                  
                </div>
              </div>
            </>
          )}

          {/* Shopping Cart */}
          <Link to="/cart">
            <div className="relative flex items-center cursor-pointer">
              <div className="relative">
                <FaShoppingCart
                  size={25}
                  className="text-gray-700 hover:text-gray-900 transition-colors duration-200"
                />
                {Array.isArray(cart) && cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
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
