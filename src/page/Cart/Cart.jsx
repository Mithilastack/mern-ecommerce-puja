import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300 mb-4">
      <div className="flex items-center space-x-4 w-[40%]">
        <img
          className="w-24 h-24 rounded-lg object-cover"
          src={item.thumbnail}
          alt={item.name}
        />
        <div>
          <h3 className="text-lg">{item.brand}</h3>
          <p className="text-sm text-gray-500">{item.title}</p>
          <span className="text-yellow-400 bg-gray-100 rounded px-1 py-1 font-bold">{item.rating}</span>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 text-sm mt-1 ml-8"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-2 w-[30%]">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="bg-gray-200 px-3 py-2 text-sm rounded-l-md hover:bg-gray-300 disabled:opacity-50"
          disabled={item.quantity <= 1}
        >
          −
        </button>
        <div className="grid grid-cols-1 items-center">
          <input
            className="w-12 text-center border border-gray-200 px-1 py-1"
            type="text"
            value={item.quantity}
            readOnly
          />
        </div>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="bg-gray-200 px-3 py-2 text-sm rounded-r-md hover:bg-gray-300"
        >
          +
        </button>
      </div>
      <div className="text-right w-[30%]">
        <p className="font-semibold text-gray-700">${item.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">
          Total: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function Cart({ cart }) {
  const [cartItems, setCartItems] = useState(cart); // Use cart prop directly

  // Update item quantity in the cart
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from the cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate total cost
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    setCartItems(cart); // Sync cartItems with the cart prop when it changes
  }, [cart]);

  return (
    <Layout>
      <div className="container mx-auto mt-5 mb-10 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="font-semibold text-2xl border-b pb-4">
                Shopping Cart
              </h1>
              {cartItems.length === 0 ? (
                <p className="text-gray-500 mt-4">Your cart is empty.</p>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                  <Link
                    to="/allproducts"
                    className="flex font-semibold text-indigo-600 text-sm mt-6"
                  >
                    ← Continue Shopping
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="font-semibold text-2xl border-b pb-4">
                Order Summary
              </h1>
              <div className="flex justify-between mt-6">
                <span className="font-medium text-gray-600">
                  Items ({cartItems.length})
                </span>
                <span className="font-semibold">${totalCost.toFixed(2)}</span>
              </div>
              <div className="mt-6">
                <button className="bg-indigo-500 w-full py-3 text-white font-semibold rounded-md hover:bg-indigo-600 transition-all duration-200">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
