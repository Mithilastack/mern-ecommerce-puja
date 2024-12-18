import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./user/page/Home/Home";
import Cart from "./user/page/Cart/Cart";
import AllProducts from "./user/components/AllProducts/AllProducts";
import Login from "./user/page/Login/Login";
import Signup from "./user/page/Signup/Signup";
import ProductView from "./user/page/ProductView/ProductView";
import ProfilePage from "./user/page/ProfilePage/ProfilePage"; // Import ProfilePage
import ContactUs from "./user/page/ContactUs/ContactUs";
import CheckoutPage from "./user/page/CheckoutPage/CheckoutPage";
import PackageView from "./user/components/packageView/packageView";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DashboardPage from "./admin/components/DashboardPage";
import DashboardLayout from "./admin/components/DashboardLayout";
import Products from "./admin/pages/Products";
import Orders from "./admin/pages/Orders";
import Customers from "./admin/pages/Customers";
import Categories from "./admin/pages/Categories";

import { AuthProvider, useAuth } from "./Contexts/AuthContext";
import ScrollToTop from "./user/components/ScrollToTop/ScrollToTop";
import PrivateRoute from "./user/components/PrivateRoute/PrivateRoute";
import AdminRoute from "./admin/components/AdminRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />
        <ScrollToTop /> {/* Ensures the page scrolls to top on route change */}
        <Routes>
          {/* User routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/productview/:productId" element={<ProductView />} />
          <Route path="/packageview/:id" element={<PackageView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/profile"
            element={
              <PrivateRoute>
              <ProfilePage />
              </PrivateRoute>
            }
          /> */}

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <DashboardLayout />
              </AdminRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
