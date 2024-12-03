import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";  // Import Outlet to render nested routes

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Sidebar for admin */}
      <div className="flex flex-col flex-grow">
        <Navbar /> {/* Navbar for admin */}
        <main className="flex-grow p-6 bg-gray-100">
          <Outlet /> {/* Render the nested routes here */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
