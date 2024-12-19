import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext"; // Ensure the correct path to AuthContext

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Show a loading spinner while checking authentication

  // Check if user is logged in and has the admin role
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />; // Redirect to login if not an admin
  }

  return children; // Render the protected component if user is admin
};

export default AdminRoute;
