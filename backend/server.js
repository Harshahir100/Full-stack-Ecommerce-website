import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

// Create express app
const app = express();

// IMPORTANT: Use Render port
const PORT = process.env.PORT || 4000;

// Connect services
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    "https://ecommerce-frontend-jwg6.onrender.com",
    "https://ecommerce-admin-5uep.onrender.com",
    "http://localhost:5173",
    "http://localhost:5174"
  ],
  credentials: true
}));

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
