import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Show loading spinner while checking auth

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children; // Render the protected page if logged in
};

export default PrivateRoute;
