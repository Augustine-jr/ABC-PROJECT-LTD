// Defining the structure of a Product
export interface Product {
  _id: string; // Unique identifier for each product
  name: string; // The name of the product
  image?: string[]; // Optional array of images 
  price: number; // The price of the product
  bestseller?: boolean; // Optional flag to indicate if the product is a bestseller
  description: string; // Add this line to include the description property
  sizes: string[];
  category: string;
  subCategory: string;
  oldPrice?: number;
  discount: number; // Add this line
  rating?: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// CartItems interface (for cart structure)
export interface CartItems {
  [itemId: string]: {
    [size: string]: number; // Size as key, quantity as value
  };
}

// Defining the structure of the ShopContext
export interface ShopContextType {
  products: Product[]; // An array of products
  currency: string; // The currency symbol (₦)
  delivery_fee: number; // The delivery fee amount
     search: string; // Added search property
    setSearch: React.Dispatch<React.SetStateAction<string>>; // Added setSearch property
    showSearch: boolean; // Ensure showSearch is also included if not already
    setShowSearch: (show: boolean) => void; // Add this line
     cartItems: CartItems;
  addToCart: (itemId: string, size: string) => void;
  getCartCount: () => number; // {{ edit_1 }} Added getCartCount to the type 
   removeFromCart: (itemId: string, size: string) => void;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartSubtotal: () => number;
  navigate: (path: string) => void; 
}

// Enum to represent the different statuses an order can have
export enum OrderStatus {
  AWAITING_CONFIRMATION = 'Awaiting Confirmation', // Order is awaiting confirmationnfrom the seller
  CONFIRMED = 'Confirmed', // Order has been confirmed by the seller
  CANCELLED = 'Cancelled', // Order was cancelled
}

// Interface defining the structure of an order
export interface order {
  id: string; // Unique Identifier for the order
  userId?: string; // Optional: ID of the user who placed the order
   cartItems: CartItems; // Details of the items in the user's cart
  totalPrice: number; // Total price of the order
  deliveryFee: number; // Delivery fee for the order
  status: OrderStatus; // Current status of the order (uses the OrderStatus enum)
  customerDetails: {
    name: string; // Customer's name
    phone: string;  // Customer's phone number
    address: string; // Customer's address
  };
  createdAt: Date; // Date and time when the order was created
  canceledReason?: string; // Optional: Reason for canceling the order
}

// Interface defining the structure of the OrderContext
export interface OrderContextType {
  orders: order[]; // Array of all Orders
  submitOrder: (orderData: Omit<order, 'id' | 'status' | 'createdAt'>) => order; // Function to create a new Order
  cancelOrder: (orderId: string) => void; // Function to cancel an Order by its ID
  getUserOrders: () => order[]; // Function to get all orders for the current user
  clearCancelledOrders: () => void; // Function to clear all cancelled orders
}