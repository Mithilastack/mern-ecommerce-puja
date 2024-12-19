import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { BASE_URL } from "../../../config";

// Profile Card Component
import { FaUserCircle } from "react-icons/fa";

const ProfileCard = ({ userData }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-24 h-24 rounded-full overflow-hidden  flex items-center justify-center bg-gray-100">
        {userData.profilePicture ? (
          <img
            src={userData.profilePicture}
            alt={`${userData.name}'s profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-gray-500 text-6xl" />
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{userData.name}</h3>
        <p className="text-gray-600">{userData.email}</p>
      </div>
    </div>
  );
};

// Loading Component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <p>Loading your profile...</p>
  </div>
);

// Error Component
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { authToken, logout } = useAuth();

  const fetchUserProfile = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${BASE_URL}/api/v1/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setUserData(response.data);
    } catch (err) {
      console.error("Error fetching profile data:", err);
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
        logout();
      } else {
        setError("An error occurred while fetching your profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) fetchUserProfile();
    else {
      setError("You need to log in to view your profile.");
      setLoading(false);
    }
  }, [authToken, logout]);

  if (loading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <ErrorMessage message={error} onRetry={fetchUserProfile} />
      </Layout>
    );

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>

          {/* Profile Card */}
          <ProfileCard userData={userData} />

          {/* Personal Information */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2">Personal Information</h4>
            <p className="text-gray-700">Email: {userData.email}</p>
            {/* Additional fields can be added here */}
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => alert("Edit Profile feature coming soon!")}
            className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
