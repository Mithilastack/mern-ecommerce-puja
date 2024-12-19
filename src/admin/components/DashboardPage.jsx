import React, { useEffect, useState } from 'react';
import { useProducts } from './Contexts/ProductsContext'; // Import the custom hook
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { FaUsers, FaShoppingCart, FaBoxes, FaRupeeSign } from 'react-icons/fa';

// Example data for the line chart
const salesData = [
  { month: 'Jan', sales: 400 },
  { month: 'Feb', sales: 300 },
  { month: 'Mar', sales: 500 },
  { month: 'Apr', sales: 200 },
  { month: 'May', sales: 600 },
  { month: 'Jun', sales: 700 },
];

const DashboardPage = () => {
  const { products } = useProducts(); // Get products from context

  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    if (products && products.length > 0) {
      // Calculate product stock distribution whenever products change
      const inStock = products.filter(product => product.stock > 0).length;
      const lowStock = products.filter(product => product.stock <= 20 && product.stock > 0).length;
      const soldOut = products.filter(product => product.stock === 0).length;

      setProductData([
        { name: 'In Stock', value: inStock, color: '#0088FE' }, // Blue
        { name: 'Low Stock', value: lowStock, color: '#FFBB28' }, // Yellow
        { name: 'Sold Out', value: soldOut, color: '#FF8042' }, // Orange
      ]);
      setLoading(false); // Set loading to false when data is ready
    }
  }, [products]); // Recalculate when products change

  // Sample data for the cards
  const totalSales = '₹1,20,000';
  const newCustomers = 250;
  const totalOrders = 320;
  const totalProducts = products.length;

  // Loading state to display spinner while fetching data
  if (loading) {
    return <CircularProgress className="m-auto mt-20" />;
  }

  return (
    <div className="p-12 grid gap-6 w-full">
      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg rounded-lg p-4">
          <CardContent className="flex items-center gap-4">
            <div className="text-3xl text-blue-500">
              <FaRupeeSign />
            </div>
            <div>
              <Typography variant="subtitle1" className="text-gray-500">
                Total Sales
              </Typography>
              <Typography variant="h5" className="font-bold">
                {totalSales}
              </Typography>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-lg p-4">
          <CardContent className="flex items-center gap-4">
            <div className="text-3xl text-green-500">
              <FaUsers />
            </div>
            <div>
              <Typography variant="subtitle1" className="text-gray-500">
                New Customers
              </Typography>
              <Typography variant="h5" className="font-bold">
                {newCustomers}
              </Typography>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-lg p-4">
          <CardContent className="flex items-center gap-4">
            <div className="text-3xl text-orange-500">
              <FaShoppingCart />
            </div>
            <div>
              <Typography variant="subtitle1" className="text-gray-500">
                Orders
              </Typography>
              <Typography variant="h5" className="font-bold">
                {totalOrders}
              </Typography>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-lg p-4">
          <CardContent className="flex items-center gap-4">
            <div className="text-3xl text-purple-500">
              <FaBoxes />
            </div>
            <div>
              <Typography variant="subtitle1" className="text-gray-500">
                Products
              </Typography>
              <Typography variant="h5" className="font-bold">
                {totalProducts}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Distribution Chart and Sales Performance Graph (Side by Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Distribution Chart */}
        <Card className="shadow-lg rounded-lg p-4">
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              Product Distribution
            </Typography>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4">
                {productData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600 font-medium">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Performance Graph */}
        <Card className="shadow-lg rounded-lg p-4">
          <CardContent>
            <Typography variant="h6" className="font-semibold mb-4">
              Sales Performance
            </Typography>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
