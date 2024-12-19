import React, { useState } from "react";
import { useProducts } from "../../admin/components/Contexts/ProductsContext"; // Import the custom hook
import { FaPen, FaTrash, FaSave, FaPlus } from "react-icons/fa"; // Font Awesome icons

const Products = () => {
  const { products, updateProduct, deleteProduct, addProduct } = useProducts(); // Get products from context
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
  });

  const itemsPerPage = 5; // Number of items to show per page

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get current page products
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Edit Button Click
  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditedProduct({ ...product });
  };

  // Handle Change in Edited Product
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Save Edits
  const handleSave = () => {
    updateProduct(editedProduct);
    setEditingProduct(null);
  };

  // Handle Delete Product
  const handleDelete = (productId) => {
    deleteProduct(productId);
  };

  // Handle Add Product Modal Open/Close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle Change in New Product Input
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Add Product
  const handleAddProduct = () => {
    const productToAdd = {
      ...newProduct,
      id: products.length + 1, // Assuming IDs are auto-generated
    };
    addProduct(productToAdd);
    setNewProduct({
      name: "",
      price: "",
      description: "",
      stock: "",
    });
    toggleModal(); // Close modal after adding product
  };

  // Handle pagination change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-16 ">
      <div className=" flex align-middle justify-between ">
        <h2 className="text-4xl font-semibold mb-6 text-gray-900">Products</h2>

        {/* Add Product Button - Move to the right */}
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-md transition duration-200 hover:bg-blue-600"
          >
            {/* <FaPlus size={20} className="mr-2" /> */}
            Add Product
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto border-collapse text-gray-900">
          <thead className="bg-indigo-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Product Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Stock</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-200 transition duration-200 ease-in-out"
              >
                <td className="px-6 py-4">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedProduct.name}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="text"
                      name="price"
                      value={editedProduct.price}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="text"
                      name="description"
                      value={editedProduct.description}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="number"
                      name="stock"
                      value={editedProduct.stock}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="px-6 py-4 flex items-center space-x-10">
                  {editingProduct?.id === product.id ? (
                    <button
                      onClick={handleSave}
                      className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md focus:outline-none transition duration-200"
                    >
                      <FaSave size={20} />
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
                      >
                        <FaPen size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out ml-4"
                      >
                        <FaTrash size={20} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md transition duration-200 hover:bg-indigo-700 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md transition duration-200 hover:bg-indigo-700 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
            <div className="mb-4">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleNewProductChange}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={newProduct.price}
                onChange={handleNewProductChange}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleNewProductChange}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleNewProductChange}
                className="px-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
