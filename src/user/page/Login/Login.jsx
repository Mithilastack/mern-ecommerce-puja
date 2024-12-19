import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext"; // Import AuthContext
import Layout from "../../components/Layout/Layout";
import { BASE_URL } from "../../../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state for button
  const { login } = useAuth(); // Use login function from AuthContext
  const navigate = useNavigate();

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error
    setLoading(true); // Start loading when the form is submitted

    // Simple form validation
    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false); // Stop loading if validation fails
      return;
    }

    try {
      // Make a POST request to the backend for login
      const response = await fetch(BASE_URL + "/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("Login Response:", data); // Log the response data for debugging

      if (response.ok) {
        // If login is successful, store the user data and token
        const { user, token } = data;
        console.log("user ==> ", user);
        console.log("token ==> ", token);

        // Update the AuthContext with user data and token
        login(user, token);

        // Redirect to home page
        navigate("/");
      } else {
        // If login fails, show the error message from the backend
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      // Handle any network errors
      console.error("Network error:", err); // Log network error
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Stop loading after the process is done
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
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
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
            disabled={loading} // Disable the button when loading
            className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
          >
            {loading ? "Logging in..." : "Login"} {/* Show loading text */}
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
