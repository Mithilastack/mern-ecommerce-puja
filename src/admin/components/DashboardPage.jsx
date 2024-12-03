import React from "react";
import { Link } from "react-router-dom";
import { FaRupeeSign, FaUsers, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import DashboardCard from "./DashboardCard";

// Import MUI components
import { Card, CardContent, Typography } from "@mui/material";

// Import Recharts components
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const DashboardPage = () => {
  // Sample data for the charts
  const ordersData = [
    { name: 'Jan', orders: 200, inventory: 150 },
    { name: 'Feb', orders: 150, inventory: 130 },
    { name: 'Mar', orders: 250, inventory: 120 },
    { name: 'Apr', orders: 300, inventory: 100 },
    { name: 'May', orders: 280, inventory: 90 },
  ];

  // Sample data for the products pie chart
  const productsPieData = [
    { name: 'In Stock', value: 120 },
    { name: 'Sold Out', value: 30 },
    { name: 'Low Stock', value: 50 }
  ];

  // Custom Colors for the charts (inspired by the cards' colors)
  const lineChartColors = {
    orders: '#4A90E2', // Blue, similar to the "Total Sales" card
    inventory: '#7ED321', // Green, inspired by the "New Customers" card
  };

  const pieChartColors = ['#4A90E2', '#F5A623', '#7ED321']; // Blue, Orange, Green

  return (
    <div className="p-6">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Link to="/admin/total-sales" className="block">
          <DashboardCard
            title="Total Sales"
            value="₹1,20,000"
            icon={<FaRupeeSign className="text-3xl" />}
            bgColor="blue"
            textColor="white"
          />
        </Link>
        <Link to="/admin/customers" className="block">
          <DashboardCard
            title="New Customers"
            value="250"
            icon={<FaUsers className="text-3xl" />}
            bgColor="green"
            textColor="white"
          />
        </Link>
        <Link to="/admin/orders" className="block">
          <DashboardCard
            title="Orders"
            value="320"
            icon={<FaShoppingCart className="text-3xl" />}
            bgColor="yellow"
            textColor="white"
          />
        </Link>
        <Link to="/admin/products" className="block">
          <DashboardCard
            title="Products"
            value="150"
            icon={<FaBoxOpen className="text-3xl" />}
            bgColor="purple"
            textColor="white"
          />
        </Link>
      </div>

      {/* Charts */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Orders vs Inventory Line Chart */}
        <Card className="shadow-lg rounded-lg">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Orders vs Inventory
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* Orders Line */}
                <Line type="monotone" dataKey="orders" stroke={lineChartColors.orders} activeDot={{ r: 8 }} name="Orders" />
                {/* Inventory Line */}
                <Line type="monotone" dataKey="inventory" stroke={lineChartColors.inventory} activeDot={{ r: 8 }} name="Inventory" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Products Pie Chart */}
        <Card className="shadow-lg rounded-lg">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Product Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productsPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}`} // Show value on hover
                  labelLine={false}
                >
                  {productsPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieChartColors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => `${name}: ${value}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
