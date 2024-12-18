import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext"; // Assuming you have AuthContext to manage the user

const ProfilePage = () => {
  // const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [shippingInfo, setShippingInfo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user: loggedInUser } = useAuth();  // Assuming `useAuth` provides logged in user's details (including token)
  const navigate = useNavigate();

  // Fetch user's profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,  // Send the token with the request
          },
        });
        // setUser(response.data.user);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setPhoneNumber(response.data.user.phoneNumber);
        // setShippingInfo(response.data.user.shippingInfo);
      } catch (error) {
        setError("Error fetching user profile.");
      }
    };

    if (loggedInUser) {
      fetchProfile();
    }
  }, [loggedInUser]);

  // Update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        "/api/v1/user/profile",
        {
          name,
          email,
          phoneNumber,
          shippingInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        }
      );
      setUser(response.data.user);
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile.");
    }
  };

  // Update password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const oldPassword = prompt("Enter your old password:");
    const newPassword = prompt("Enter your new password:");

    try {
      await axios.put(
        "/api/v1/user/profile/password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        }
      );
      alert("Password updated successfully!");
    } catch (error) {
      alert("Failed to update password.");
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleProfileUpdate}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Shipping Info</label>
          <textarea
            value={shippingInfo}
            onChange={(e) => setShippingInfo(e.target.value)}
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>

      <button onClick={handlePasswordUpdate}>Update Password</button>
    </div>
  );
};

export default ProfilePage;
