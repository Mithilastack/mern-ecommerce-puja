import { useState } from "react";
import "./App.css";
import Home from "./page/Home/Home";
import Cart from "./page/Cart/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllProducts from "./components/AllProducts/AllProducts";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";

function App() {
  const [cart, setCart] = useState([]);

  // Add item to the cart
  const AddToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]); // Add the new item to the cart

    const isProductExist = cart.find((findItem) => findItem.id === item.id);

    if (isProductExist) {
      const upDateCart = cart.map((item) =>
        item.id === item.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      setCart(upDateCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home cart={cart} />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route
            path="/allproducts"
            element={<AllProducts AddToCart={AddToCart} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
