import React, { useContext, useState } from "react";
import { CartContext } from "../../../Contexts/CartContext";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  const { cart, totalPrice, removeItemFromCart, updateQuantity } = useContext(CartContext);
  const [address, setAddress] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
  });
  const [status, setStatus] = useState("");

  // Handle address change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle Checkout Submit
  const handleCheckout = (e) => {
    e.preventDefault();

    if (!address.name || !address.email || !address.phone || !address.street || !address.city || !address.postalCode) {
      setStatus("Please fill in all the fields.");
      return;
    }

    // Simulate checkout processing
    setStatus("Processing your order...");

    setTimeout(() => {
      setStatus("Your order has been placed successfully! Thank you for shopping with us.");
      // Here, you would typically send the order details to the backend for processing
    }, 2000);
  };

  return (
    <div className="container mx-auto mt-10 mb-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items Section */}
        <div className="w-full lg:w-3/4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="font-semibold text-2xl border-b pb-4">Review Your Order</h1>
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">
                <p className="text-lg">Your cart is empty.</p>
                <Link to="/allproducts" className="text-indigo-500 hover:underline mt-4 text-lg">
                  Browse products →
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6 mt-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-center justify-between hover:shadow-lg transition duration-300 mb-4"
                  >
                    <div className="flex items-center space-x-4 w-full sm:w-[40%]">
                      <img className="w-24 h-24 rounded-lg object-cover" src={item.image} alt={item.title} />
                      <div>
                        <h3 className="text-lg font-semibold">{item.brand}</h3>
                        <p className="text-sm text-gray-600">{item.title}</p>
                        <span className="text-yellow-400 bg-gray-100 rounded px-2 py-1 font-bold">{item.rating} ★</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full sm:w-[30%]">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 px-3 py-2 rounded-l-md hover:bg-gray-300 disabled:opacity-50 text-sm"
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          className="w-10 text-center border border-gray-300 px-1 py-1 text-sm"
                          type="text"
                          value={item.quantity}
                          readOnly
                          aria-label={`Quantity of ${item.title}`}
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-3 py-2 rounded-r-md hover:bg-gray-300 text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-700">${item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                        <button
                          onClick={() => removeItemFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm mt-1"
                          aria-label={`Remove ${item.title}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="font-semibold text-2xl border-b pb-4">Order Summary</h1>
            <div className="flex justify-between mt-6">
              <span className="font-medium text-gray-600">Items ({cart.length})</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Shipping Address Form */}
            <div className="mt-6">
              <label className="block text-gray-600 font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={address.name}
                onChange={handleAddressChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={address.email}
                onChange={handleAddressChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={address.phone}
                onChange={handleAddressChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-2">Street Address</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleAddressChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                placeholder="Enter your street address"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-2">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                placeholder="Enter your city"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-2">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={address.postalCode}
                onChange={handleAddressChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg"
                placeholder="Enter your postal code"
              />
            </div>

            {/* Checkout Button */}
            <div className="mt-6">
              <button
                className="bg-indigo-500 w-full py-3 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-200"
                onClick={handleCheckout}
                aria-label="Place Order"
              >
                Place Order (Cash on Delivery)
              </button>
            </div>

            {status && (
              <div className="mt-4 text-center text-sm text-gray-500">{status}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
