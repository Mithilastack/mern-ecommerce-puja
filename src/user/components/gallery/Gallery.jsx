import React, { useState } from "react";

const Gallery = ({ packageView }) => {
  const [selectedImage, setSelectedImage] = useState(
    packageView.image || "https://dummyimage.com/400x400"
  );
  const [showMoreImages, setShowMoreImages] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleShowMoreImages = () => {
    setShowMoreImages(!showMoreImages);
  };

  // Limit the visible images to 3 initially
  const visibleItems = showMoreImages ? packageView.items : packageView.items?.slice(0, 3);

  return (
    <div className="flex flex-col items-center">
      {/* Main Image Display */}
      <div className="w-full max-w-sm mb-4">
        <img
          src={selectedImage}
          alt="Selected Package"
          className="rounded-lg shadow-lg object-cover w-full h-auto"
        />
      </div>

      {/* Thumbnail Section */}
      <div className="w-full max-w-sm flex gap-3 overflow-x-auto flex-nowrap mb-4">
        {/* Package Image */}
        <button
          onClick={() =>
            handleImageClick(packageView.image || "https://dummyimage.com/400x400")
          }
          className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${
            selectedImage === packageView.image
              ? "border-red-500"
              : "border-gray-300"
          }`}
        >
          <img
            src={packageView.image || "https://dummyimage.com/400x400"}
            alt="Package Thumbnail"
            className="object-cover w-full h-full"
          />
        </button>

        {/* Item Images */}
        {visibleItems?.map((item) => (
          <button
            key={item.id}
            onClick={() => handleImageClick(item.image || "https://dummyimage.com/100x100")}
            className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${
              selectedImage === item.image
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <img
              src={item.image || "https://dummyimage.com/100x100"}
              alt={item.name}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* "+3" Button for extra images */}
      {packageView.items?.length > 3 && !showMoreImages && (
        <button
          onClick={handleShowMoreImages}
          className="w-20 h-20 border-2 rounded-lg flex items-center justify-center bg-gray-200 text-gray-600 font-semibold mb-4"
        >
          +{packageView.items.length - 3}
        </button>
      )}

      {/* Display extra images below when +3 is clicked */}
      {showMoreImages && (
        <div className="w-full max-w-sm flex gap-3 flex-wrap mb-4">
          {/* Displaying the remaining images */}
          {packageView.items?.slice(3).map((item) => (
            <button
              key={item.id}
              onClick={() => handleImageClick(item.image || "https://dummyimage.com/100x100")}
              className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${
                selectedImage === item.image
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <img
                src={item.image || "https://dummyimage.com/100x100"}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
