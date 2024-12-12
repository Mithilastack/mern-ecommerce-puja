import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useAuth } from "../../../Contexts/AuthContext"; // Import the AuthContext
import Layout from "../../components/Layout/Layout";

const Login = () => {
  // State to store email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store any error messages

  const { login } = useAuth(); // Destructure login function from AuthContext
  const navigate = useNavigate(); // For redirection after successful login

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    // For now, we simulate a login request
    if (email === "test@example.com" && password === "password123") {
      const fakeUser = { email, name: "John Doe", token: "fakeToken123" };
      login(fakeUser); // Save user to context
      navigate("/"); // Redirect to home page after login
    } else {
      setError("Invalid email or password."); // Set error message
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-0">
        <div className="lg:w-1/3 md:w-1/2 !mt-0 bg-white rounded-lg p-8 flex flex-col w-full shadow-md">
          <h2 className="text-gray-900 text-2xl font-bold title-font mb-4 text-center">
            Login
          </h2>
          
          {/* Email Input */}
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              placeholder="Enter your email"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          
          {/* Password Input */}
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              placeholder="Enter your password"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          
          {/* Display Error Message if any */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          {/* Login Button */}
          <button
            onClick={handleSubmit} // Call handleSubmit on click
            className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
          >
            Login
          </button>
          
          {/* Sign up redirect */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;