import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  // User authentication state
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      // Ensure all fields exist
      return {
        firstName: parsed.firstName || '',
        lastName: parsed.lastName || '',
        name: parsed.name || '',
        email: parsed.email || '',
        mobile: parsed.mobile || '',
        address: parsed.address || '',
        street: parsed.street || '',
        city: parsed.city || '',
        state: parsed.state || '',
        country: parsed.country || '',
        zipcode: parsed.zipcode || '',
        pincode: parsed.pincode || '',
        gender: parsed.gender || '',
      };
    }
    return null;
  });

  // Login and logout helpers
  // Accepts an object with all profile fields
  const login = (userInfo) => {
    const userData = {
      firstName: userInfo.firstName || '',
      lastName: userInfo.lastName || '',
      name: userInfo.name || '',
      email: userInfo.email || '',
      mobile: userInfo.mobile || '',
      address: userInfo.address || '',
      street: userInfo.street || '',
      city: userInfo.city || '',
      state: userInfo.state || '',
      country: userInfo.country || '',
      zipcode: userInfo.zipcode || '',
      pincode: userInfo.pincode || '',
      gender: userInfo.gender || '',
    };
    setUser(userData);
    localStorage.setItem("userInfo", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
  };
  
  // Get backend URL - prioritize env var, then detect production, then localhost
  const getBackendUrl = () => {
    // Check environment variable first
    const envUrl = import.meta.env.VITE_BACKEND_URL;
    if (envUrl && envUrl.trim() !== '' && envUrl !== 'undefined') {

      return envUrl;
    }
    
    // Auto-detect production environment at runtime
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const protocol = window.location.protocol;

      
      // If NOT localhost or 127.0.0.1, assume production
      const isLocalhost = hostname === 'localhost' || 
                         hostname === '127.0.0.1' || 
                         hostname === '0.0.0.0' ||
                         hostname.startsWith('192.168.') ||
                         hostname.startsWith('10.') ||
                         hostname.startsWith('172.');
      
      if (!isLocalhost) {
        const prodUrl = "https://backend-r6kj.onrender.com";

        return prodUrl;
      }
    }
    
    // Default to localhost for local development

    return "http://localhost:4000";
  };
  
  const backendUrl = getBackendUrl();

  
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      // Try /api/product/list first, then fallback to /api/product
      const endpoints = [
        `${backendUrl}/api/product/list`,
        `${backendUrl}/api/product`
      ];
      
      let data = null;
      let lastError = null;
      
      for (const endpoint of endpoints) {
        try {

          const res = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          
          data = await res.json();

          
          // Handle different response formats
          if (data.products && Array.isArray(data.products)) {
            setProducts(data.products);
            return; // Success, exit function
          } else if (Array.isArray(data)) {
            // If response is directly an array
            setProducts(data);
            return;
          } else {

            lastError = new Error("Unexpected response format");
          }
        } catch (err) {

          lastError = err;
          // Continue to next endpoint
        }
      }
      
      // If we get here, all endpoints failed
      if (lastError) {
        throw lastError;
      }
      
    } catch (err) {


      toast.error("Failed to load products. Please check your connection.");
      // Set empty array to prevent undefined errors
      setProducts([]);
    }
  };

  fetchProducts();
  }, [backendUrl]);
  const navigate = useNavigate();

  const currency = "₹";
  const delivery_fee = 50;

  useEffect(() => {
    // INFO: Load cart items from localStorage when the component mounts
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    // INFO: Save cart items to localStorage whenever cartItems changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please Select a Size");
      return;
    } else {
      toast.success("Item Added To The Cart");
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          // INFO: Error Handling
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    if (quantity === 0) {
      const productData = products.find((product) => product._id === itemId);
      toast.success("Item Removed From The Cart");
    }

    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  // Update user profile fields (all fields)
  const updateProfile = (fields) => {
    setUser((prev) => {
      const updated = { ...prev, ...fields };
      localStorage.setItem("userInfo", JSON.stringify(updated));
      return updated;
    });
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    user,
    login,
    logout,
    updateProfile,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
