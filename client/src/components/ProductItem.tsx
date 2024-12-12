import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing ShopContext to use the global state (context) to get currency
import { Link } from 'react-router-dom'; // Importing Link to create navigable links between different pages (for routing)

// The ProductItem component receives props: id, image, name, and price, which define the product details.
// React.FC<{id: number | string, image: string[], name: string, price: number}> ensures that the props have strict types.
// - 'id': the unique identifier of the product (number or string)
// - 'image': an array of image URLs (as strings), we're using the first image to display the product
// - 'name': the product name (string)
// - 'price': the product price (number)



const ProductItem: React.FC<{ id: string; name: string; price: number; image?: string[] }>=({ id, image, name, price }) => {

  // Using the ShopContext to access global state (like the currency symbol)
  const context = useContext(ShopContext);

  // This ensures that the component is used within a ShopProvider (where ShopContext is defined)
  // If the context is not available, an error will be thrown.
  if (!context) throw new Error('ProductItem must be used within a ShopProvider');

  // Destructuring the 'currency' value from the ShopContext
  const { currency } = context;

  // This is the JSX (HTML-like syntax) that represents the product item in the UI
  return (
    // The 'Link' component makes the entire product clickable, directing the user to the product's details page using the product's id
    <Link className='text-gray-700 cursor-pointer' to={`/products/${id}`}>
      
      {/* A div container for the product image with flexbox styling for alignment.
          The 'overflow-hidden' class ensures that any overflowing part of the image remains hidden. 
          The height is responsive with different sizes for different screen sizes (using 'sm', 'lg'). */}
      <div className='overflow-hidden w-full flex justify-center items-center h-40 sm:h-20 lg:h-[20rem]'>
        
        {/* The product image itself, using the first image in the 'image' array.
            A hover effect ('hover:scale-110') makes the image zoom in when the user hovers over it. 
            'transition ease-in-out' adds a smooth animation effect to the zoom. */}
        <img className='hover:scale-110 transition ease-in-out w-full' src={image && image.length > 0 ? image[0] : 'default-image-url.jpg'} alt="" />
      </div>

      {/* Below the image, displaying the product's name with padding for spacing.
          The text is styled with 'text-sm' for a small font size. */}
      <p className='pt-3 pb-1 text-sm'>{name}</p>

      {/* Displaying the price of the product.
          The 'currency' symbol from the context is shown before the price.
          The price text is styled with a custom color and 'font-medium' for a slightly bold look. */}
      <p className='text-sm font-medium' style={{ color: 'rgb(100, 88, 50)' }}>{currency}{price}</p>
    </Link>
  );
}

export default ProductItem; // Exporting the component so it can be used in other parts of the application.
