import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import banner images for desktop and mobile
import banner1Desktop from "../assets/images/bannerDesktop-1.webp";
import banner2Desktop from "../assets/images/bannerDesktop-2.png";

import banner1Mobile from "../assets/images/bannerMobile-1.png";
import banner2Mobile from "../assets/images/bannerMobile-2.png";
import banner3Mobile from "../assets/images/bannerMobile-3.png";

import BestSellers from "../Bestseller/Bestseller";

function HeroSection() {
  const bannersDesktop = [banner1Desktop, banner2Desktop];
  const bannersMobile = [banner1Mobile, banner2Mobile, banner3Mobile];

  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop
    speed: 800, // Transition speed
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Autoplay delay
    slidesToShow: 1, // Show 1 slide at a time
    slidesToScroll: 1, // Scroll 1 slide at a time
    arrows: false, // Remove the icon buttons (prev/next)
    centerMode: true, // Enable center mode for mobile and desktop
    centerPadding: "10%", // Add padding on both sides of the centered slide
    focusOnSelect: true, // Focus on selected slide
    responsive: [
      {
        breakpoint: 1024, // Medium devices (tablets)
        settings: {
          slidesToShow: 1, // Show 1 slide at once on tablets
          slidesToScroll: 1,
          centerPadding: "20%", // Slightly higher padding on tablets
        },
      },
      {
        breakpoint: 768, // Mobile devices (phones)
        settings: {
          slidesToShow: 1, // Show 1 slide at a time
          slidesToScroll: 1,
          centerPadding: "10%", // Smaller padding for mobile
        },
      },
    ],
  };

  return (
    <>
      {/* Carousel */}
      <Slider {...settings}>
        {(window.innerWidth <= 768 ? bannersMobile : bannersDesktop).map(
          (banner, index) => (
            <div
              key={index}
              className="px-2 focus:outline-none focus:border-none" // Remove focus outline and border from container
            >
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-[350px] lg:h-[450px] object-cover object-center rounded-md shadow-md focus:outline-none focus:border-none" // Set height to ensure image fits well
              />
            </div>
          )
        )}
      </Slider>

      {/* Highlight Section */}
      <BestSellers />
    </>
  );
}

export default HeroSection;
