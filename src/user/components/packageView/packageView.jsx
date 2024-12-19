import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { products } from "../../../data/data";
import ItemsTable from "../ItemsTable/ItemsTable";
import { CartContext } from "../../../Contexts/CartContext";
import Gallery from "../gallery/Gallery";

const PackageView = () => {
  const { id } = useParams();
  const { addItemToCart, totalPrice } = useContext(CartContext);
  const packageView = products.find((item) => item.id === parseInt(id));

  // Initialize the selectedItems state as an object where each item is selected by default
  const [selectedItems, setSelectedItems] = useState({});
  const [quantities, setQuantities] = useState({}); // Keep track of item quantities
  const [packageTotal, setPackageTotal] = useState(0);

  useEffect(() => {
    if (packageView) {
      // Initialize selectedItems to true for all items by default
      const initialSelectedItems = packageView.items.reduce((acc, item) => {
        acc[item.id] = true; // Mark all items as selected initially
        return acc;
      }, {});

      const initialQuantities = packageView.items.reduce((acc, item) => {
        acc[item.id] = 1; // Initialize quantity to 1 for all items initially
        return acc;
      }, {});

      setSelectedItems(initialSelectedItems);
      setQuantities(initialQuantities);

      // Calculate the total price of all selected items initially
      const initialTotal = packageView.items.reduce(
        (acc, item) => acc + item.price,
        0
      );
      setPackageTotal(initialTotal);
    }
  }, [packageView]);

  useEffect(() => {
    // Recalculate the total price when selectedItems or quantities change
    const newTotal = packageView.items.reduce((acc, item) => {
      if (selectedItems[item.id]) {
        acc += item.price * quantities[item.id];
      }
      return acc;
    }, 0);
    setPackageTotal(newTotal);
  }, [selectedItems, quantities, packageView]);

  const handleUpdateTotalPrice = (updatedSelectedItems, updatedQuantities) => {
    setSelectedItems(updatedSelectedItems);
    setQuantities(updatedQuantities);
  };

  const handleAddToCart = () => {
    // Add the package with selected items to the cart
    const selectedPackageItems = packageView.items.filter(
      (item) => selectedItems[item.id]
    );
    addItemToCart({
      ...packageView,
      items: selectedPackageItems,
      price: packageTotal,
    });
  };

  if (!packageView) return <p>Package not found</p>;

  const items = Array.isArray(packageView.items)
    ? packageView.items
    : Object.values(packageView.items || {});

  return (
    <Layout>
      <section className="text-gray-600 body-font bg-white">
        <div className="container mx-auto px-5 py-10">
        <div className="flex flex-col md:flex-row bg-white  overflow-hidden">
        {/* Gallery Section */}
            <div className="w-full md:w-1/2 bg-white p-4">
              <Gallery packageView={packageView} />
            </div>

            {/* Package Details */}
            <div className="w-full md:w-1/2 p-6">
              <div className="h-full flex flex-col justify-between">
                {/* Title, Description, and Rating */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    {packageView.title}
                  </h1>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {packageView.description}
                  </p>
                  <div className="flex items-center mb-6">
                    <span className="text-yellow-400 text-lg flex items-center">
                      ⭐ {packageView.rating}
                    </span>
                    <span className="text-gray-600 ml-3 text-sm">
                      {packageView.reviews} Reviews
                    </span>
                  </div>

                  {/* Package Items Section */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Package Items
                    </h3>
                    <ItemsTable
                      items={items}
                      selectedItems={selectedItems}
                      quantities={quantities}
                      onUpdateTotalPrice={handleUpdateTotalPrice}
                    />
                  </div>
                </div>

                {/* Sticky Footer for Total Price and Add to Cart */}
                <div className="sticky bottom-0 py-6 px-8 mt-6 w-full flex items-center justify-between z-10">
                  <span className="text-2xl font-bold text-gray-800">
                    ₹{packageTotal.toLocaleString()}
                  </span>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PackageView;
