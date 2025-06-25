import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

export const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("product-list/");
        console.log(res.data)
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourite") || "[]");
    setFavorites(stored);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favourite", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <ContextApi.Provider value={{ data, loading, favorites, toggleFavorite }}>
      {children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;
