import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";
import { CartContext } from "../../../Contexts/CartContext";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
  const { addItemToCart } = useContext(CartContext);
  const [allCategory, setAllCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectProducts, setSelectProducts] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  const [searchItem, setSearchItem] = useState("");

  // Fetch all products (if needed)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios("https://dummyjson.com/products");
        setAllProducts(res.data.products); // Assuming `products` is the array from the API response
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, []); // Only runs once when the component is mounted

  // Fetch categories for filtering products
  useEffect(() => {
    const getAllProductsCategory = async () => {
      try {
        const res = await axios("https://dummyjson.com/products/category-list");
        setAllCategory(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllProductsCategory();
  }, []);

  // Fetch products based on category
  useEffect(() => {
    if (!selectProducts) {
      setProducts(allProducts);
    }
  }, [selectProducts, allProducts]);

  // Fetch products based on selected category
  useEffect(() => {
    const getProductsByCategory = async () => {
      try {
        if (selectProducts) {
          const res = await axios(
            `https://dummyjson.com/products/category/${selectProducts}`
          );
          setProducts(res.data.products);
        } else {
          setProducts(allProducts); // If no category is selected, show all products
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProductsByCategory();
  }, [selectProducts, allProducts]);

  // Filter products based on category
  const filterProducts = (category) => {
    setSelectProducts(category);

    if (category === "") {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category === category
      );
      setProducts(filteredProducts);
    }
  };

  // Search products
  const handleSearchItem = (e) => {
    const query = e.target.value.trim();
    setSearchItem(query);

    if (query === "") {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filteredProducts);
    }
  };

  return (
    <>
      <Layout>
        {/* PRODUCTS CATEGORY SECTION */}
        <div className="flex justify-center items-center gap-1 mt-5 p-2 w-1/2 mx-auto rounded-lg shadow-lg">
          {/* Dropdown Section */}
          <select
            onChange={(e) => filterProducts(e.target.value)}
            value={selectProducts}
            className="border-r-0 bg-gray-100 text-gray-700 p-3 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="" disabled>
              Filter By Category
            </option>
            {allCategory.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Search Section */}
          <input
            type="text"
            placeholder="Search items..."
            className="w-full bg-gray-100 text-gray-700 p-3 rounded-r-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            onChange={handleSearchItem}
          />
        </div>

        {/* PRODUCTS SECTION */}
        <div className="flex flex-wrap justify-center gap-10 mt-3 mb-9 ml-5 mr-9">
          {products.length > 0 ? (
            products.map((item) => (
              <div
                className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-3xl cursor-pointer"
                key={item.id}
              >
                <Link
                  to={`/productview/${item.id}`}
                  className="block relative h-48 rounded overflow-hidden"
                >
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block bg-transparent"
                    src={item.thumbnail}
                  />
                </Link>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm font-semibold">${item.price}</p>
                    <p className="mt-1 text-xs text-gray-600 font-medium">
                      Ratings:{" "}
                      <span className="text-yellow-400 bg-gray-100 rounded px-1 py-1 font-bold">
                        {item.rating
                          ? item.rating.toFixed(1)
                          : "No ratings yet"}{" "}
                        ★
                      </span>
                    </p>
                  </div>
                  <button
                    className="text-black w-[40%] px-1 py-2 text-sm mt-10 rounded border border-black hover:bg-red-500 hover:text-white hover:border-white transition duration-200"
                    onClick={() => addItemToCart(item)} // Toast will trigger from context
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </Layout>
    </>
  );
};

export default AllProducts;
