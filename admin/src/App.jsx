import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Get backend URL with production fallback
const getBackendUrl = () => {
  // Check environment variable first
  const envUrl = import.meta.env.VITE_BACKEND_URL;
  if (envUrl && envUrl.trim() !== '' && envUrl !== 'undefined') {
    console.log("✅ Admin: Using backend URL from env:", envUrl);
    return envUrl;
  }
  
  // Auto-detect production environment at runtime
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    console.log("🔍 Admin: Detecting environment - hostname:", hostname);
    
    // If NOT localhost, assume production
    const isLocalhost = hostname === 'localhost' || 
                       hostname === '127.0.0.1' || 
                       hostname === '0.0.0.0' ||
                       hostname.startsWith('192.168.') ||
                       hostname.startsWith('10.') ||
                       hostname.startsWith('172.');
    
    if (!isLocalhost) {
      const prodUrl = "https://backend-r6kj.onrender.com";
      console.log("🌐 Admin: Detected production environment, using:", prodUrl);
      return prodUrl;
    }
  }
  
  // Default to localhost for local development
  console.log("💻 Admin: Using localhost backend URL for development");
  return "http://localhost:4000";
};

export const backendUrl = getBackendUrl();
console.log("🎯 Admin: Final backend URL:", backendUrl);

export const currency = (price) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
};

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Slide
      />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
