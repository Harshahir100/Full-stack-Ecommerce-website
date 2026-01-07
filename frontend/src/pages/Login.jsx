
import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { login } = useContext(ShopContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get backend URL - same logic as ShopContext
  const getBackendUrl = () => {
    const envUrl = import.meta.env.VITE_BACKEND_URL;
    if (envUrl && envUrl.trim() !== '') {
      return envUrl;
    }
    
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const protocol = window.location.protocol;
      
      // If deployed on Render (production)
      if (hostname.includes('render.com') || hostname.includes('onrender.com')) {
        return "https://backend-r6kj.onrender.com";
      }
      
      // If using HTTPS in production (not localhost)
      if (protocol === 'https:' && hostname !== 'localhost' && !hostname.includes('127.0.0.1')) {
        return "https://backend-r6kj.onrender.com";
      }
    }
    
    return "http://localhost:4000";
  };
  
  const backendUrl = getBackendUrl();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint =
        currentState === "Login"
          ? `${backendUrl}/api/user/login`
          : `${backendUrl}/api/user/register`;
      const payload =
        currentState === "Login"
          ? { email, password }
          : { name, email, password };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Something went wrong");
      } else {
        // Always set name, firstName, lastName, and email in context, fallback to form values if missing
        let firstName = "";
        let lastName = "";
        if ((data.name || name).includes(" ")) {
          const parts = (data.name || name).split(" ");
          firstName = parts[0];
          lastName = parts.slice(1).join(" ");
        } else {
          firstName = data.name || name;
        }
        const userInfo = {
          ...data,
          name: data.name || name,
          firstName,
          lastName,
          email: data.email || email,
        };
        login(userInfo);
        // Redirect to home or previous page
        navigate("/");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="John Doe"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="hello@gmail.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create a new account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button className="px-8 py-2 mt-4 font-light text-white bg-black" disabled={loading}>
        {loading ? "Please wait..." : currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
