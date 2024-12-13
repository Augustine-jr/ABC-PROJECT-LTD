// Import necessary libraries and types
import React, { createContext, ReactNode, useEffect, useState, useMemo, useCallback } from "react"; 
import { ShopContextType, CartItems, Product } from "../types"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

// Define API endpoint
const API_URL = "http://localhost:5000/api";

// Create ShopContext with default values
export const ShopContext = createContext<ShopContextType>({
  products: [],
  setProducts: () => {},
  currency: "₦",
  delivery_fee: 10,
  search: "",
  setSearch: () => {},
  showSearch: false,
  setShowSearch: () => {},
  cartItems: {},
  addToCart: () => {},
  getCartCount: () => 0,
  removeFromCart: () => {},
  updateQuantity: () => {},
  getCartSubtotal: () => 0,
  navigate: () => {},
});

// ShopContextProvider Component
export const ShopContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItems>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const currency = "₦";
  const delivery_fee = 10;
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Save cart to localStorage when cartItems change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart operations
  const addToCart = useCallback((itemId: string, size: string) => {
    setCartItems((prevCartItems) => {
      const updatedCart = { ...prevCartItems };
      if (!updatedCart[itemId]) updatedCart[itemId] = {};
      updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
      return updatedCart;
    });
  }, []);

  const removeFromCart = useCallback((itemId: string, size: string) => {
    setCartItems((prevCartItems) => {
      const newCart = { ...prevCartItems };
      if (newCart[itemId] && newCart[itemId][size]) {
        const { [size]: removed, ...remainingSizes } = newCart[itemId];
        if (Object.keys(remainingSizes).length === 0) {
          const { [itemId]: removedItem, ...remainingItems } = newCart;
          return remainingItems;
        }
        newCart[itemId] = remainingSizes;
      }
      return newCart;
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, size: string, quantity: number) => {
    setCartItems((prevCartItems) => {
      const newCart = { ...prevCartItems };
      if (!newCart[itemId]) newCart[itemId] = {};
      if (quantity <= 0) {
        const { [size]: removed, ...remainingSizes } = newCart[itemId];
        if (Object.keys(remainingSizes).length === 0) {
          const { [itemId]: removedItem, ...remainingItems } = newCart;
          return remainingItems;
        }
        newCart[itemId] = remainingSizes;
      } else {
        newCart[itemId][size] = quantity;
      }
      return newCart;
    });
  }, []);

  const getCartCount = useCallback(() => {
    return Object.values(cartItems).reduce(
      (totalCount, sizes) =>
        totalCount + Object.values(sizes || {}).reduce((sum, count) => sum + count, 0),
      0
    );
  }, [cartItems]);

  const getCartSubtotal = useCallback(() => {
    return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
      const product = products.find((p) => p._id === itemId);
      if (!product) return total;
      return total + Object.values(sizes).reduce((subtotal, quantity) => {
        return subtotal + product.price * quantity;
      }, 0);
    }, 0);
  }, [cartItems, products]);

  // Memoized context value
  const value = useMemo(() => ({
    products,
    setProducts,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    removeFromCart,
    updateQuantity,
    getCartSubtotal,
    navigate,
  }), [products, cartItems, search, showSearch, navigate]);

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
