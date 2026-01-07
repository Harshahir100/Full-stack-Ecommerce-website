import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    console.log("🔗 Admin Login - Backend URL:", backendUrl);
    if (!backendUrl || backendUrl === 'undefined') {
      console.error("❌ Backend URL is not set!");
      toast.error("Backend URL not configured. Please check environment variables.");
    }
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";
    
    try {
      console.log("🔐 Admin login attempt to:", backendUrl + "/api/user/admin");
      console.log("📧 Email:", email);
      
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });

      console.log("✅ Admin login response:", response.data);

      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Login successful.");
      } else {
        toast.error(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("❌ Admin login error:", error);
      
      // Better error messages
      if (error.response) {
        // Server responded with error
        const errorMessage = error.response.data?.message || error.response.data?.error || "Login failed";
        toast.error(errorMessage);
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received. Backend URL:", backendUrl);
        toast.error("Cannot connect to server. Please check your connection.");
      } else {
        // Something else happened
        console.error("Error setting up request:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      // Restore button state
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        <div className="mb-3 w-fit">
          <img src={assets.logo} alt="Trendify" />
        </div>
        <h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="mb-2 text-sm font-medium text-gray-700">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="w-full px-4 py-2 mt-5 text-white bg-black rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
