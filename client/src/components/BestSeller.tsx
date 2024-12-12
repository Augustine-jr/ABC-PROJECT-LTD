// Importing necessary libraries and components
import React, { useContext, useEffect, useState } from 'react';
// useContext allows us to use context data in this component.
// useEffect lets us run code when the component mounts or updates.
// useState allows us to manage state in this component.
import { ShopContext } from '../context/ShopContext'; // Importing the context to get shop data
import Title from './Title'; // Importing Title component for displaying titles
import ProductItem from './ProductItem'; // Importing ProductItem to display each product
import { ShopContextType, Product } from '../types'; // Importing types for better TypeScript support

const BestSeller = () => {
  // Using the context to access the shop data
  const context = useContext(ShopContext); 

  // Check if context is available, throw an error if not
  if (!context) {
    throw new Error('BestSeller must be used within a ShopContextProvider');
  }

  const { products } = context; // Destructure products from context

  // State to hold the best-selling products
  const [bestSeller, setBestSeller] = useState<Product[]>([]); // Initially, it's an empty array

  // Effect hook to find best-selling products when products change
  useEffect(() => {
    // Filter products to find those marked as bestsellers
    const bestProduct = products.filter((item) => item.bestseller);
    // Update state with the first 4 best-selling products
    setBestSeller(bestProduct.slice(0, 4));
  }, [products]); // Run this effect whenever 'products' changes

  // Display loading message if products are not yet loaded
  if (!products.length) return <p>Loading...</p>;

  return (
    <div className='my-10'> {/* Outer div with margin */}
      <div className='text-center text-3xl py-8'> {/* Centered title with padding */}
        {/* Title component shows "BEST SELLERS" */}
        <Title text1='BEST' text2='SELLERS' />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base'>
          {/* Description below the title */}
          These products have sold the most in the past 30 days. You may also want to check out our popular products.
        </p>
      </div>

      {/* Grid layout for displaying products */}
      <div className='grid grid-cols-2 divide-[#d1c7a3] divide-y md:divide-y-0 border-[#d1c7a3] border-y divide-x sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-0'>
        {/* Map through the best-sellers and render each product */}
        {
          bestSeller.map((item, index) => (
            <div key={index} className="p-4"> {/* Padding for each product */}
              {/* Render each product with fallback for image and name */}
              <ProductItem 
                id={item._id} // Product ID
                image={Array.isArray(item.image) ? item.image : [item.image || 'https://via.placeholder.com/150']}
                name={item.name || ''} // Fallback name if none provided
                price={item.price} // Product price
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default BestSeller; // Export the BestSeller component
