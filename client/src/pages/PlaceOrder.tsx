import React, { useState, useContext } from 'react';
import { useForm, FieldValues } from 'react-hook-form'; 
import { ShopContext } from '../context/ShopContext';
import { OrderContext } from '../context/OrderContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  // Consuming context to get shop-related data (cart Items, products, currency, etc.)
  const { cartItems, products, currency, getCartSubtotal, delivery_fee } = useContext(ShopContext);
  const { submitOrder } = useContext(OrderContext);
  const navigate = useNavigate();

  // Check if the cart is empty, if so, display a message to the user
  if (!Object.keys(cartItems).length) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="text-center max-w-lg w-full">
        <h1 className="text-2xl font-bold sm:text-3xl mb-4">Your cart is empty!</h1>
        <p className="text-lg sm:text-xl">Please add some items to your cart before placing an order.</p>
      </div>
      </div>
      
    );
  }


  // Calculate subtotal and total price based on cart items, currency, and delivery fee
  const subtotal = getCartSubtotal();
  const totalPrice = subtotal + delivery_fee;

  // Set up form handling with react hook form
  const { register, handleSubmit, formState: { errors } } = useForm();

 
    // Handle form submission
  const handlePlaceOrder = (data: FieldValues) => {
    try {
      // Submit the order
      const newOrder = submitOrder({
        cartItems,
        totalPrice,
        deliveryFee: delivery_fee,
        customerDetails: {
          name: data.name,
          phone: data.phone,
          address: data.address
        }
      });

      // Show success toast
      toast.success('Order placed successfully!');

      // Navigate to orders page
      navigate('/orders');
    } catch (error) {
      // Handle any errors during order submission
      toast.error('Failed to place order. Please try again.');
      console.error(error);
    }
  };



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Place Your Order</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Details Form */}
        <div className="p-4 border rounded-md shadow-md bg-white">
          <h2 className="text-lg font-semibold mb-4">Your Details</h2>
          <form className="space-y-4" onSubmit={handleSubmit(handlePlaceOrder)}>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className={`w-full border rounded-md p-2 ${errors.name ? 'border-red-500' : ''}`} // Add red border if there's an error
                {...register('name', { required: 'Please enter your name' })} // Register the input field with validation rule
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>} {/* Show error message */}
            </div>
    
              {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                className={`w-full border rounded-md p-2 ${errors.phone ? 'border-red-500' : ''}`} // Add red border if there's an error
                {...register('phone', { required: 'Please enter your phone number.' })} // Register the phone input with validation
              />
            </div>
            
            {/* Address Textarea */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                placeholder="Enter your address"
                className={`w-full border rounded-md p-2 ${errors.address ? 'border-red-500' : ''}`} // Add red border if there's an error
                rows={3}
                {...register('address', { required: 'Please enter your address.' })} // Register address input with validation
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message as string}</p>} {/* Show error message */}
            </div>

               {/* Place Order Button */}
            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className={`px-6 py-3 rounded-md ${
                  !errors.name && !errors.phone && !errors.address  // Enable button only when no errors
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' // Active button style
                    : 'bg-gray-400 cursor-not-allowed'  // Disabled button style
                }`}
                disabled={!!errors.name || !!errors.phone || !!errors.address} // Disable button if there are validation errors
              >
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="p-4 border rounded-md shadow-md bg-white">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2">
            {/* Loop through the cart items and display them */}
            {Object.entries(cartItems).map(([itemId, sizes]) => {
              const product = products.find((p) => p._id === itemId);  // Find the product by its ID
              if (!product) return null; // If no product found, skip rendering

              return Object.entries(sizes).map(([size, quantity]) => (
                <li
                  key={`${itemId}-${size}`}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <div>
                    {/* Product name, size, and quantity */}
                    <span className="font-medium">{product.name}</span> ({size})
                    <br />
                    <span>Qty: {quantity}</span>
                  </div>
                  <div>
                    {/* Display the product price multiplied by quantity */}
                    {currency}
                    {product.price * quantity}
                  </div>
                </li>
              ));
            })}
          </ul>

          {/* Subtotal */}
          <div className="mt-4 flex justify-between">
            <span>Subtotal:</span>
            <span>
              {currency}
              {subtotal}
            </span>
          </div>

          {/* Delivery Fee */}
          <div className="mt-2 flex justify-between">
            <span>Delivery Fee:</span>
            <span>
              {currency}
              {delivery_fee}
            </span>
          </div>

          {/* Total Price */}
          <div className="mt-4 flex justify-between font-semibold">
            <span>Total:</span>
            <span>
              {currency}
              {totalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
