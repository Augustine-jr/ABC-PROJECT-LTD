import React, { createContext, useState, useContext, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importing UUID to generate unique IDs for orders
import { order, OrderStatus, OrderContextType } from '../types'; // Importing custom types for orders and order status
import { ShopContext } from './ShopContext'; // Importing the ShopContext to access cart items

// Creating the OrderContext with a default value to avoid 'undefined' when it's used before being provided
export const OrderContext = createContext<OrderContextType>({
  orders: [], // Default orders array is empty
  submitOrder: () => ({} as order), // Placeholder function to submit an order (does nothing for now)
  cancelOrder: () => {}, // Placeholder function to cancel an order (does nothing for now)
  getUserOrders: () => [], // Placeholder function to get user orders (returns an empty array)
  clearCancelledOrders: () => {}, // Change return type to void
});

// Creating the orderProvider componenet that will wrap the app and provide context
export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 // Stste to manage orders, initialized with values from localStorage (if any)
  const [orders, setOrders] = useState<order[]>(() => {
    // Try to load orders from localStorage
    const storedOrders = localStorage.getItem('orders');
    // If there are orders in localStorage, parse them as an array , otherwise return an empty array
    return storedOrders ? JSON.parse(storedOrders) : [];
  });


  // Getting relevant values from the shopContext (cart items, subtotal, delivery fee)
  const { getCartSubtotal, delivery_fee, cartItems } = useContext(ShopContext);

  // Function to submit a new order
  const submitOrder = (orderData: Omit<order, 'id' | 'status' | 'createdAt'>) => {
    // Create a new order with the provided data and default values (id, status, createdAt)
    const newOrder: order = {
      id: uuidv4(), // Generate a unique ID for the order
      ...orderData, // Spread the order data (everything except id, status, createdAt)
      status: OrderStatus.AWAITING_CONFIRMATION, // Set the initial status to "Awaiting Confirmation"
      createdAt: new Date() // Set  the creation date to the current data and time
    };


    // Add the new order to the existing orders List
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders); // Update the state with the new orders list
    
    // Save the updated orders list to localStorage so that it's persistent across page reloads
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // TODO: Implement backend order submission
    // TODO: Send notifications

    return newOrder; // Return the new order
  };

  // Function to cancel  an order
  const cancelOrder = (orderId: string) => {
    // Create a new list of orders where the canceled order is updated with a new status and reason
    const updatedOrders = orders.map(order => 
      order.id === orderId // Find the order to cancel based on its ID
        ? { 
            ...order, 
            status: OrderStatus.CANCELLED, // Change status to "Cancelled"
            canceledReason: 'User requested cancellation' // Add a reason for cancellation
          } 
        : order // if the order ID doesn't match, keep it as it is
    );

    setOrders(updatedOrders); // Update the state with the updated orders list
    localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Save the updated orders list to localStorage

    // TODO: Implement backend order cancellation (e.g., notify server)
  };

  // Function to clear cancelled orders
  const clearCancelledOrders = () => {
    const updatedOrders = orders.filter(order => order.status !== OrderStatus.CANCELLED);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders)); // Update localStorage
  }

  // Function to get all orders(returns the current list of orders)
  const getUserOrders = () => {
    return orders; // Simply return the current state of orders
  };

  // Memoizing the context value to optimize performance (recomputing only when 'orders' changes)
  const value = useMemo(() => ({
    orders, // The current list of orders
    submitOrder, // Function to submit a new order
    cancelOrder, // Function to cancel an order
    getUserOrders, // function to get all user orders
    clearCancelledOrders, // Function to clear cancelled orders
  }), [orders]); // only recompute when 'orders' changes

  // The OrderProvidercomponent will provide the context to all its child components
  return (
    <OrderContext.Provider value={value}>
      {children} {/* The child components will have access to the OrderContext */}
    </OrderContext.Provider>
  );
};