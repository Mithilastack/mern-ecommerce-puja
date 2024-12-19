import React from "react";
import { FaUserCircle } from "react-icons/fa";

const ProfileCard = ({ userData }) => {
  return (
    <div className="flex items-center space-x-6 p-6 border rounded-lg bg-white shadow">
      <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
        {userData.profilePicture ? (
          <img
            src={userData.profilePicture}
            alt={`${userData.name}'s profile`}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-gray-500 text-7xl" />
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{userData.name}</h3>
        <p className="text-gray-600">{userData.email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
