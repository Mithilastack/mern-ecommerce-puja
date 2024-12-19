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

  // Combine the main image with the rest of the images
  const galleryImages = [
    { image: packageView.image || "https://dummyimage.com/100x100", name: "Main Image" },
    ...packageView.items,
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Main Image */}
      <div className="w-full max-w-sm mb-4">
        <img
          src={selectedImage}
          alt="Selected Package"
          className="rounded-lg shadow-lg object-cover w-full aspect-square"
        />
      </div>

      {/* Thumbnails Section */}
      <div className="w-full max-w-sm grid grid-cols-4 gap-3 mb-4">
        {/* Display up to 4 thumbnails */}
        {(showMoreImages ? galleryImages : galleryImages.slice(0, 4)).map((item, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(item.image)}
            className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-transform transform hover:scale-110 ${
              selectedImage === item.image
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <img
              src={item.image}
              alt={item.name || `Image ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* "+X More" Button */}
      {!showMoreImages && galleryImages.length > 4 && (
        <button
          onClick={handleShowMoreImages}
          className="w-full max-w-sm h-10 border-2 rounded-lg bg-gray-200 text-gray-600 font-semibold flex items-center justify-center mb-4"
        >
          +{galleryImages.length - 4} More
        </button>
      )}
    </div>
  );
};

export default Gallery;
