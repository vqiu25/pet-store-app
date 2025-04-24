import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9000;

// Function that responds before we send the client a response
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port 9000");
});
