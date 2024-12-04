import React from "react";
import { ProductsProvider } from "./Contexts/ProductsContext"; // Import the ProductsContext provider
import DashboardPage from "./DashboardPage";
import Products from "../pages/Products";
import Sidebar from "../components/Sidebar"; // Assuming you have a Sidebar component
import { Outlet } from 'react-router-dom'; 

const App = () => {
  return (
    <>
      <ProductsProvider>
        <div className="app-container flex">
          <Sidebar /> {/* Sidebar stays static */}
          {/* <DashboardPage /> */}
          <Outlet />
        </div>
      </ProductsProvider>
    </>
  );
};

export default App;
