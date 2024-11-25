import React from 'react';
import CardBestseller from '../CardsBestseller/CardsBestseller.jsx'; 
import banner2 from "../assets/images/banner-2.jpeg";

const products = [
  {
    image: banner2,
    title: 'Product 1',
    description: 'Amazing discounts on Product 1!',
  },
  {
    image: banner2,
    title: 'Product 2',
    description: 'Hurry! Limited time offer.',
  },
  {
    image: banner2,
    title: 'Product 3',
    description: 'Best value for your money!',
  },
];

const Bestseller = () => {
  return (
    <div className="mt-8 px-4 md:px-16 mb-20 ">
      <h2 className="text-2xl font-bold mb-8 text-center">BESTSELLER</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <CardBestseller
            key={index}
            image={product.image}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
