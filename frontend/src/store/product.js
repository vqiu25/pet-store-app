import { create } from "zustand";

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
}));
