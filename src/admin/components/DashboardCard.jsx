import React from "react";

const DashboardCard = ({ title, value, icon, bgColor, textColor }) => {
  return (
    <div
      className={`flex items-center p-6 shadow-lg rounded-xl transform transition duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
        bgColor === "blue"
          ? "bg-blue-500"
          : bgColor === "green"
          ? "bg-green-500"
          : bgColor === "yellow"
          ? "bg-yellow-400"
          : "bg-purple-500"
      }`}
    >
      <div
        className={`p-4 rounded-full shadow-lg ${
          textColor === "white" ? "text-white" : "text-gray-800"
        }`}
      >
        {icon}
      </div>
      <div className="ml-6 flex flex-col truncate">
        <h2 className="text-lg font-semibold text-white truncate">{title}</h2>
        <p className="text-2xl font-bold text-white truncate">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
