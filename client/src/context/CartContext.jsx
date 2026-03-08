import React, { createContext, useState, useEffect, useContext } from "react";
import { cartApi } from "../api/cartApi";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      if (!isLoggedIn) return;

      const res = await cartApi.getCart();
      if (res.status === "success") {
        setCartItems(res.cart);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Cart fetch error", err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isLoggedIn]);

  return <CartContext.Provider value={{ cartItems, fetchCart }}>{children}</CartContext.Provider>;
};
