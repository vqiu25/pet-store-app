import Product from "../model/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    // Pass in empty object to find all products
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body; // User will send this data
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Product not found" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      product,
      { new: true } // Return the updated document
    );
    res.status(200).json({ data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Product not found" });
  }
};
