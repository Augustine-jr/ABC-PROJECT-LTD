// Importing necessary libraries and components
import React, { useContext, useState, useEffect } from 'react'; // Importing React and hooks
import { ShopContext } from '../context/ShopContext'; // Importing ShopContext to access the global state (products)
import Title from './Title'; // Importing the 'Title' component to display the section title
import ProductItem from './ProductItem'; // Importing 'ProductItem' to display individual products
import { Product } from '../types'; // Importing the 'Product' type to define the structure of a product

// 'LatestCollection' component displays a section with the latest products
const LatestCollection = () => {
  // Using the ShopContext to access the global state for products
  const context = useContext(ShopContext);

  // Throw an error if the context is not defined (i.e., if this component is used outside of the provider)
  if (!context) {
    throw new Error('LatestCollection must be used within a ShopContextProvider');
  }
  
  // Destructuring 'products' from the context
  const { products } = context;

  // Creating a state variable 'latestProducts' to store the latest 10 products
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);

  // Using 'useEffect' to update 'latestProducts' whenever 'products' changes
  useEffect(() => {
    // Check if 'products' is an array before trying to slice it
    if (Array.isArray(products)) {
      // Slice the first 8 products from the products list and update 'latestProducts' state
      setLatestProducts(products.slice(0, 8));
    } 
  }, [products]); // The effect will run whenever 'products' changes

  return (
    <div className='my-10 border-[#d1c7a3]'>
      {/* Title Section */}
      <div className='text-center py-8 text-3xl'>
        {/* Passing 'LATEST' and 'SUPPLIES' to the 'Title' component to display the section title */}
        <Title text1={'LATEST'} text2={'SUPPLIES'} />
        
        {/* A short description text under the title about the quality of the products */}
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-black'>
          Quality building materials don't have to break the bank. Discover our competitive prices on a wide range of woods and nails, without compromising on quality.
        </p>
      </div>

      {/* Grid Section for displaying products */}
      {/* Creating a grid layout to display the products, with responsive columns */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-0 divide-[#d1c7a3] divide-y md:divide-y-0 border-[#d1c7a3] border-y divide-x">
        {
          // Mapping over the 'latestProducts' array to render a ProductItem for each product
          latestProducts.map((item, index) => (
            // Each product item needs a unique key prop; using index here as a fallback
            <div key={index} className="p-4"> {/* Add padding to each item */}
              {/* Render the ProductItem component with the necessary props */}
              <ProductItem id={item._id} image={item.image ?? []} name={item.name} price={item.price} />
            </div>
          ))
        }
      </div>
    </div>
  );
}

// Exporting the LatestCollection component for use in other parts of the application
export default LatestCollection;
