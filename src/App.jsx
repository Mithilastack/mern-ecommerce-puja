import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./user/page/Home/Home";
import Cart from "./user/page/Cart/Cart";
import AllProducts from "./user/components/AllProducts/AllProducts";
import Login from "./user/page/Login/Login";
import Signup from "./user/page/Signup/Signup";
import ProductView from "./user/page/ProductView/ProductView";
import { ToastContainer } from "react-toastify";  // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";    // Import Toast styles
import DashboardPage from "./admin/components/DashboardPage";
import DashboardLayout from "./admin/components/DashboardLayout"; // Layout wrapper for admin
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Customers from "./admin/pages/Customers";
import Categories from "./admin/pages/Categories";


const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/productview/:productId" element={<ProductView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin routes (with Sidebar and DashboardLayout) */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />  {/* Dashboard default route */}
          <Route path="products" element={<Products />} /> {/* Products route */}
          <Route path="orders" element={<Orders />} /> 
          <Route path="customers" element={<Customers />} /> 
          <Route path="categories" element={<Categories />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
