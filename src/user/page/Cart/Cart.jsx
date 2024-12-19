import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Contexts/CartContext";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const { cart, removeItemFromCart, updateQuantity } = useContext(CartContext);

  // Calculate total cost
  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
      <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center justify-between hover:shadow-lg transition duration-300 mb-4 gap-4 sm:gap-6">
        <div className="flex items-center space-x-4 w-full sm:w-[40%]">
          <img
            className="w-24 h-24 rounded-lg object-cover"
            src={item.image}
            alt={item.title}
          />
          <div>
            <h3 className="text-lg font-semibold">{item.brand}</h3>
            <p className="text-sm text-gray-500">{item.title}</p>
            <span className="text-yellow-400 bg-gray-100 rounded px-2 py-1 font-bold">
              {item.rating} ★
            </span>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-500 hover:text-red-700 text-sm mt-1"
              aria-label={`Remove ${item.title}`}
            >
              Remove
            </button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full sm:w-[30%]">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="bg-gray-200 px-3 py-2 md:rounded-l-md rounded-md hover:bg-gray-300 disabled:opacity-50 text-sm"
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
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="bg-gray-200 px-3 py-2 md:rounded-r-md rounded-md hover:bg-gray-300 text-sm"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <div className="text-right w-full sm:w-auto">
            <p className="font-semibold text-gray-700">
              ${item.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              Total: ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto mt-5 mb-10 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items Section */}
          <div className="w-full lg:w-3/4">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h1 className="font-semibold text-xl md:text-2xl border-b pb-2 md:pb-4">
                Shopping Cart
              </h1>
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-4">
                  <p className="text-sm md:text-base">Your cart is empty.</p>
                  <Link
                    to="/allproducts"
                    className="text-indigo-500 hover:underline mt-4 block text-sm md:text-base"
                  >
                    Browse products →
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-4 mt-4">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItemFromCart}
                      />
                    ))}
                  </div>
                  <Link
                    to="/allproducts"
                    className="flex font-semibold text-indigo-600 text-sm md:text-base mt-6"
                  >
                    ← Continue Shopping
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="font-semibold text-2xl border-b pb-4">
                Order Summary
              </h1>
              <div className="flex justify-between mt-6">
                <span className="font-medium text-gray-600">
                  Items ({cart.length})
                </span>
                <span className="font-semibold">${totalCost.toFixed(2)}</span>
              </div>
              <div className="mt-6">
                <Link to="/checkout">
                  <button
                    className="bg-indigo-500 w-full py-3 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-200"
                    aria-label="Proceed to checkout"
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
