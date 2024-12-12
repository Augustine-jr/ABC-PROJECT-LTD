import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the structure of a cart item. Each item has:
// - `_id`: the product ID
// - `size`: the size of the product
// - `quantity`: the number of this item in the cart
interface CartItem {
  _id: string;
  size: string;
  quantity: number;
}

// This is the main cart component that displays cart items and the order summary
const Cart = () => {
  // Destructure values and functions from the ShopContext
// - `products`: all products in the store
// - `currency`: currency symbol (e.g., $ or £)
// - `cartItems`: current cart state (items, sizes, and quantities)
// - `addToCart`, `removeFromCart`, `updateQuantity`: functions to manage the cart
// - `getCartSubtotal`: calculates the subtotal price of items in the cart
  const { products, currency, cartItems, addToCart, removeFromCart, updateQuantity, getCartSubtotal, navigate} = useContext(ShopContext);


  // Generate an array of cart items from cartItems object
  // - Convert nested objects (item ID and sizes) into an array of cart items
  // - Filter out items with a quantity of 0 or less
  const cartData = useMemo(() => {
    return Object.entries(cartItems).flatMap(([itemId, sizes]) =>
      Object.entries(sizes).map(([size, quantity]) => ({
        _id: itemId,
        size,
        quantity: Math.max(quantity, 0), // prevent negative quantities
      }))
    ).filter(item => item.quantity > 0); // Only include items with a positive quantity 
  }, [cartItems]); // Recalculate only when cartItems change
  
  //  A function to handle increasing or decreasing item quantities
  //  - Prevents setting a quantity below 1 by showing a toast message
  //  - Calls updateQuantity to update the quantity in the cart context
 const handleQuantityChange = useCallback((itemId: string, size: string, newQuantity: number) => {
  if (newQuantity < 1) {
    toast.info('Quantity must be at least 1.'); // Show an info message
    return; // Stop further execution
  }
  updateQuantity(itemId, size, newQuantity); // Update the quantity
}, [updateQuantity]);  // Recreate the function only if updateQuantity changes


 // Removes an item from the cart and shows a success notification
  const handleRemoveItem = useCallback((itemId: string, size: string) => {
    removeFromCart(itemId, size); // Call the function to remove the item
     toast.success('Item removed from cart');// Show success message
  }, [removeFromCart]); // Recreate the function only if removeFromCart changes

  // If the cart is empty, show a message and a button to continue shopping
  if (cartData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some items to get started!</p>
        <button 
          onClick={() => navigate('/')} // Navigate to the home page
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // Calculate the total price of items in the cart
  const subtotal = getCartSubtotal(); // Total cost of items in the cart
  const deliveryFee = 10; // Flat delivery fee (can be dynamic later)
  const total = subtotal + deliveryFee; // final total (subtotal + delivery fee)

  return (
    // Main container for the cart page
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        {/* Render the cart title using a reusable Title component */} 
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

        {/* Cart Items */}
        <div className="space-y-4">
          {/* // Loop through the cartData array to render each cart item */}
          {cartData.map((item) => {
            const product = products.find(p => p._id === item._id); {/* Find the product object in the products array based on the item's ID */}
            if (!product) return null; {/* Skip rendering if the product is not found */}

            return (
              <div 
                key={`${item._id}-${item.size}`}
                className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 overflow-hidden rounded-md">
                  <img 
                    src={product.image?.[0] || '/placeholder.png'} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="font-semibold">{currency}{product.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item._id, item.size)}
                      className="text-red-500 hover:text-red-600 transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="w-full sm:w-auto text-right">
                  <p className="font-semibold text-lg">
                    {currency}{(product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="space-y-4">
              {/* Subtotal */}
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{currency}{subtotal.toFixed(2)}</span>
            </div>
            
            {/* Delivery Fee */}
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{currency}{deliveryFee.toFixed(2)}</span>
            </div>
            
            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{currency}{total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Checkout Button */}
            <button
              onClick={() => navigate('/place-order')} // Navigate to the checkout page
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors mt-6"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;