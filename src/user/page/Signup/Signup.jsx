import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";  // Use useNavigate here
import axios from "axios";
import { BASE_URL } from "../../../config";

const Signup = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  // State to handle error and success messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();  // Use useNavigate hook

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.fullName || !formData.phoneNumber || !formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    // Clear any previous error messages
    setError("");

    try {
      // Make the signup request to the backend
      const response = await axios.post(BASE_URL+"api/v1/auth/signup", {
        name: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setMessage("Signup successful! You can now log in.");
        // Redirect to login page after successful signup
        setTimeout(() => {
          navigate("/login");  // Use navigate to redirect
        }, 2000);
      }
    } catch (err) {
      // Handle server-side validation or errors
      setError(err.response ? err.response.data.message : "Error occurred during signup.");
    }
  };

  return (
    <Layout>
      <div>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-0">
          <div className="lg:w-1/3 md:w-1/2 !mt-0 bg-white rounded-lg p-8 flex flex-col w-full shadow-md">
            <h2 className="text-gray-900 text-2xl font-bold title-font mb-4 text-center">
              Sign Up
            </h2>

            {/* Error or Success Message */}
            {message && <p className="text-green-500 text-sm text-center">{message}</p>}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {/* Signup Form */}
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label htmlFor="fullName" className="leading-7 text-sm text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label htmlFor="phoneNumber" className="leading-7 text-sm text-gray-600">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <button
                type="submit"
                className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              >
                Sign up
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Do you have an account?{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
