import React, { useEffect, useState, useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../../Contexts/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductView = () => {
  const { addItemToCart } = useContext(CartContext);
  const { productId } = useParams();

  const [productView, setProductView] = useState(null);

  const handleAddToCart = () => {
    addItemToCart(productView);
    // toast.success(`${productView.title} has been added to your cart!`, {
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  };

  useEffect(() => {
    const ProductViewFetch = async () => {
      try {
        const res = await axios(`https://dummyjson.com/products/${productId}`);
        setProductView(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    ProductViewFetch();
  }, [productId]);

  if (!productView) return <p>Loading...</p>;

  return (
    <Layout>
      <ToastContainer />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={productView.thumbnail || "https://dummyimage.com/400x400"}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-10">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {productView.title}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {productView.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">
                    {productView.rating} Reviews
                  </span>
                </span>
              </div>
              <p className="leading-relaxed">{productView.description}</p>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900 mt-10">
                  ${productView.price}
                </span>
                <button
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded mt-10"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductView;
