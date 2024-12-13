import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { products } from "../../../data/data";
import ItemsTable from "../ItemsTable/ItemsTable";
import { CartContext } from "../../../Contexts/CartContext";

const PackageView = () => {
  const { id } = useParams();
  const { addItemToCart, totalPrice } = useContext(CartContext); 
  const packageView = products.find((item) => item.id === parseInt(id));

  // To track the selected items' price in the package
  const [packageTotal, setPackageTotal] = useState(packageView?.price || 0);

  useEffect(() => {
    // Update packageTotal whenever the cart price changes
    setPackageTotal(totalPrice);
  }, [totalPrice]);

  if (!packageView) return <p>Package not found</p>;

  // Ensure packageView.items is an array (convert if it's an object)
  const items = Array.isArray(packageView.items) ? packageView.items : Object.values(packageView.items || {});

  // Handle Add to Cart logic
  const handleAddToCart = () => {
    // Add the total price of selected items to the cart
    addItemToCart({ ...packageView, price: packageTotal });
  };

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto px-5 py-10">
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Package Image */}
            <div className="w-full md:w-1/2">
              <img
                alt={packageView.title}
                className="h-60vh w-full object-cover"
                src={packageView.image || "https://dummyimage.com/400x400"}
              />
            </div>

            {/* Package Details */}
            <div className="w-full md:w-1/2 p-6">
              <div className="h-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  {packageView.title}
                </h1>
                <p className="text-gray-600 mb-4">{packageView.description}</p>
                <div className="flex items-center mb-4">
                  <span className="text-yellow-400 text-sm">
                    ⭐ {packageView.rating}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {packageView.reviews} Reviews
                  </span>
                </div>

                {/* Package Items Section */}
                <div className="mt-10">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Package Items
                  </h3>
                  <ItemsTable items={items} onUpdateTotalPrice={setPackageTotal} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Add to Cart and Price Section */}
      <div className="sticky bottom-5 left-1/2 transform -translate-x-1/2 bg-white shadow-2xl rounded-lg py-4 px-5 w-full max-w-lg flex items-center justify-between z-10">
        <span className="text-2xl font-bold text-gray-800">
          ₹{packageTotal} {/* Show updated total price */}
        </span>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </Layout>
  );
};

export default PackageView;
