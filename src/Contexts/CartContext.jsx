import { createContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create the CartContext
export const CartContext = createContext();

// Define and export CartProvider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // Track the total price

  // Function to update the quantity of an item
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantity
    setCart((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
      calculateTotal(updatedCart); // Recalculate total when quantity is updated
      return updatedCart;
    });
  };

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        toast.info(`Increased quantity of ${item.title} in the cart.`); // Toast when quantity is increased
        const updatedCart = prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        calculateTotal(updatedCart); // Recalculate total when item quantity is updated
        return updatedCart;
      }
      toast.success(`${item.title} added to cart!`); // Toast when a new item is added
      const updatedCart = [...prev, { ...item, quantity: 1 }];
      calculateTotal(updatedCart); // Recalculate total when new item is added
      return updatedCart;
    });
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      calculateTotal(updatedCart); // Recalculate total when an item is removed
      return updatedCart;
    });
    toast.error("Item removed from cart.");
  };

  // Function to calculate the total price of the cart
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total); // Set the new total price
  };

  // Return the context provider
  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice, // Provide total price to components
        updateQuantity,
        addItemToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
