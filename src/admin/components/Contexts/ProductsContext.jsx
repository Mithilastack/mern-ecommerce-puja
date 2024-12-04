import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const ProductsContext = createContext();

// Create a provider component
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fetch product data (or mock data)
  useEffect(() => {
    const mockProducts = [
      { id: 1, name: 'Product 1', price: '₹500', description: 'This is product 1', stock: 50 },
      { id: 2, name: 'Product 2', price: '₹700', description: 'This is product 2', stock: 30 },
      { id: 3, name: 'Product 3', price: '₹400', description: 'This is product 3', stock: 100 },
      { id: 4, name: 'Product 4', price: '₹1200', description: 'This is product 4', stock: 0 },
      { id: 5, name: 'Product 5', price: '₹1200', description: 'This is product 5', stock: 15 },
    ];
    setProducts(mockProducts);  // Simulating API call
  }, []);

  // Add a new product
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Update a product
  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Delete a product
  const deleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

// Custom hook to use the Products Context
export const useProducts = () => useContext(ProductsContext);
