import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <Layout>
        <div>
          <div className="flex items-center justify-center min-h-screen bg-gray-100 p-0">
            <div className="lg:w-1/3 md:w-1/2 !mt-0 bg-white rounded-lg p-8 flex flex-col w-full shadow-md">
              <h2 className="text-gray-900 text-2xl font-bold title-font mb-4 text-center">
                Sign Up
              </h2>

              <div className="relative mb-4">
                <label
                  htmlFor="fullName"
                  className="leading-7 text-sm text-gray-600"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="leading-7 text-sm text-gray-600"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

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
                  placeholder="Enter your password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <button className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                Sign up
              </button>

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
    </>
  );
};

export default Signup;
