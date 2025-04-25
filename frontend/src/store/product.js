import { create } from "zustand";
import { deleteProduct } from "../../../backend/controllers/product.controller";

export const useProductStore = create((set) => ({
  product: [],
  setProducts: (products) => set({ product: products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    set((state) => ({
      product: [...state.product, data],
    }));
    return { success: true, message: "Product created succesfully" };
  },
  fetchProducts: async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    set({ product: data });
  },
  deleteProduct: async (id) => {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    set((state) => ({
      product: state.product.filter((item) => item._id !== id),
    }));
    return { success: true, message: "Product deleted successfully" };
  },
  updateProduct: async (id, updatedProduct) => {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || "Update failed" };
    }

    set((state) => ({
      product: state.product.map((item) =>
        item._id === id ? { ...item, ...updatedProduct } : item
      ),
    }));

    return { success: true, message: "Product updated successfully" };
  },
}));
