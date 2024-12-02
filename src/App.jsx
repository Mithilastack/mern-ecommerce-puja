import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Cart from "./page/Cart/Cart";
import AllProducts from "./components/AllProducts/AllProducts";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import ProductView from "./page/ProductView/ProductView";
import { ToastContainer } from "react-toastify";  // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";    // Import Toast styles

const App = () => {
  return (
    <BrowserRouter>
      {/* ToastContainer should be inside the Router so that it's accessible for all components */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/productview/:productId" element={<ProductView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
