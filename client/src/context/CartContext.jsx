import React, { createContext, useState, useEffect } from "react";
import { cartApi } from "../api/cartApi";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await cartApi.getCart();

      if (res.status === "success") {
        setCartItems(res.cart);
      }
    } catch (error) {
      console.log("Cart fetch error");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
