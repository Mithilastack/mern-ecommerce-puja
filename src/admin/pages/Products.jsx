import React, { useState, useEffect } from 'react';

// Mock data for the products (You can replace this with actual API calls)
const mockProducts = [
  { id: 1, name: 'Product 1', price: '₹500', description: 'This is product 1', stock: 50 },
  { id: 2, name: 'Product 2', price: '₹700', description: 'This is product 2', stock: 30 },
  { id: 3, name: 'Product 3', price: '₹400', description: 'This is product 3', stock: 100 },
  { id: 4, name: 'Product 4', price: '₹1200', description: 'This is product 4', stock: 10 },
];

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulating an API call
    setProducts(mockProducts);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      {/* Product Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Product Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
