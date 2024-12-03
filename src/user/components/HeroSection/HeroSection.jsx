import React from "react";
import banner1 from "../assets/images/banner-1.webp";
import banner2 from "../assets/images/banner-2.jpeg";
import BestSellers from "../Bestseller/Bestseller";
import Bestseller from "../Bestseller/Bestseller";


function HeroSection() {
  return (
    <>
      <div>
        <img
          src={banner1}
          alt=""
          className="w-full object-cover object-center"
        />
      </div>
      {/* Highlight Section */}
      
      <Bestseller />
     
    </>
  );
}

export default HeroSection;
