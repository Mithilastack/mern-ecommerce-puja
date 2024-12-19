import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../config";
import Layout from "../../components/Layout/Layout";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserOrder from "../../components/UserOrder/UserOrder"; // Import UserOrder

// Loading and Error Components
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <p>Loading your profile...</p>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <p className="text-red-500 mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded"
      >
        Retry
      </button>
    )}
  </div>
);

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]); // State for orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { authToken, logout } = useAuth();

  // Fetch User Profile and Orders
  const fetchUserProfileAndOrders = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch user profile data
      const userResponse = await axios.get(`${BASE_URL}/api/v1/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUserData(userResponse.data);

      // Fetch orders using the userData._id (dynamic user ID)
      const ordersResponse = await axios.get(`${BASE_URL}/api/v1/order/my`, {
        params: { id: userResponse.data._id }, // Use dynamic user ID
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setOrders(ordersResponse.data); // Set orders data
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
        logout();
      } else {
        setError("An error occurred while fetching your profile and orders.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) fetchUserProfileAndOrders();
    else {
      setError("You need to log in to view your profile.");
      setLoading(false);
    }
  }, [authToken, logout]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={fetchUserProfileAndOrders} />;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-center mb-6">Your Profile</h2>

            {/* Profile Card */}
            <ProfileCard userData={userData} />

            {/* Personal Information */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-2">Personal Information</h4>
              <p className="text-gray-700 mb-1">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {userData.phone || "Not provided"}
              </p>
            </div>

            {/* Orders Section */}
            <div className="mt-8 bg-gray-50 p-4 rounded-lg shadow">
              <h4 className="text-lg font-semibold mb-2">Your Orders</h4>
              {orders.length === 0 ? (
                <p className="text-gray-600">You haven't placed any orders yet.</p>
              ) : (
                orders.map((order) => (
                  <UserOrder key={order._id} order={order} /> // Use UserOrder for each order
                ))
              )}
            </div>

            {/* Edit Profile Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={() => alert("Edit Profile feature coming soon!")}
                className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-8 rounded"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
