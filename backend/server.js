import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();

// Function that responds before we send the client a response
app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/products", productRoutes);

app.listen(9000, () => {
  connectDB();
  console.log("Server is running on port 9000");
});
