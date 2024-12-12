import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { products } from "../../../data/data";
import ItemsTable from "../ItemsTable/ItemsTable";

const PackageView = () => {
  const { id } = useParams();
  const packageView = products.find((item) => item.id === parseInt(id));

  if (!packageView) return <p>Package not found</p>;

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto px-5 py-10">
          <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Package Image */}
            <div className="w-full md:w-1/2">
              <img
                alt={packageView.title}
                className="h-full w-full object-cover"
                src={packageView.image || "https://dummyimage.com/400x400"}
              />
            </div>

            {/* Package Details */}
            <div className="w-full md:w-1/2 p-6">
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
              {/* Move Package Items below */}
              <div className="mt-10 ml-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Package Items
                </h3>
                <ItemsTable items={packageView.items} />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-800">
                  ${packageView.price}
                </span>
                <button
                  className="ml-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() =>
                    console.log(`Added ${packageView.title} to cart`)
                  }
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

export default PackageView;
