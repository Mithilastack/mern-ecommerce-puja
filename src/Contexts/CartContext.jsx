import { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast notifications
// import { toast } from "react-toastify";

// Create the CartContext
export const CartContext = createContext();

// Define and export CartProvider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to update the quantity of an item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantity
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Function to add an item to the cart

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        toast.info(`Increased quantity of ${item.title} in the cart.`); // Toast when quantity is increased
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      toast.success(`${item.title} added to cart!`); // Toast when a new item is added
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.error("Item removed from cart.");
  };

  // Return the context provider
  return (
    <CartContext.Provider
      value={{ cart, updateQuantity, addItemToCart, removeItemFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
