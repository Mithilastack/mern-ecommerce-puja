import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layout/Layout";

const AllProducts = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectProducts, setSelectProducts] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products (if needed)
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios("https://dummyjson.com/products");
        // console.log(res.data); // Check response structure
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
        console.log(error);
      }
    };

    getAllProductsCategory();
  }, []);

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
  }, [selectProducts, allProducts]); // Runs when selectProducts or allProducts changes

  // Filter products based on category
  const filterProducts = (allProduct) => {
    setSelectProducts(allProduct);
  };

  return (
    <>
      <Layout>
        {/* PRODUCTS CATEGORY SECTION */}
        <div className="flex gap-3 flex-wrap">
          <select
            onChange={(e) => filterProducts(e.target.value)}
            value={selectProducts} // Make the select dropdown controlled
          >
            <option value="">Filter By Category</option>
            {allCategory.map((category, index) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* PRODUCTS SECTION */}
        <div className="flex flex-wrap justify-center gap-10 mt-3 mb-9 ml-5 mr-9">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div
                className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-3xl cursor-pointer"
                key={item.id}
              >
                <a className="block relative h-48 rounded overflow-hidden">
                  <img
                    alt="ecommerce"
                    className="object-cover object-center w-full h-full block bg-transparent"
                    src={item.thumbnail}
                  />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {item.title}
                  </h3>
                  <p className="mt-1">${item.price}</p>
                  <p className="mt-1">Ratings: {item.rating}</p>
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
