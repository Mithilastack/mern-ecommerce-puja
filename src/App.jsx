import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Cart from "./page/Cart/Cart";
import AllProducts from "./components/AllProducts/AllProducts";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";

const App = () => {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    
  );
};

export default App;
