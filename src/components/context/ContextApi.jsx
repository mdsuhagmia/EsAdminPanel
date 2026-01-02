import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const ApiData = createContext();

const ContextApi = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("https://es-back-xv9z.onrender.com/api/user", {
        withCredentials: true,
    });
    setUsers(response.data.payload.users)
      
    } catch (error) {
      console.error("User fetch error:", error.response?.data?.message || error.message);
    }
  };
  const productsData = async () => {
    try {
      const response = await axios.get("https://es-back-xv9z.onrender.com/api/products", {
        withCredentials: true,
    });
    setProducts(response.data.payload.Products)
      
    } catch (error) {
      console.error("User fetch error:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getData();
    productsData();
  }, []);

  return (
    <ApiData.Provider value={{ users, products }}>
      {children}
    </ApiData.Provider>
  );
};

export default ContextApi;