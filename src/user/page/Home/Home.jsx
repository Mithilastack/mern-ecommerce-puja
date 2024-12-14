import React from "react";
import Layout from "../../components/Layout/Layout";
import HeroSection from "../../components/HeroSection/HeroSection";

const home = ({ cart }) => {
  // const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  // // console.log(totalQuantity);

  return (
    <Layout>
      <HeroSection />
    </Layout>
  );
};

export default home;
