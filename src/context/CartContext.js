import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      alert('Product already in cart!');
      return;
    }
    setCart([...cart, { ...product, tenure: 1 }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateTenure = (id, tenure) => {
    setCart(cart.map(item => item.id === id ? { ...item, tenure } : item));
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.tenure) + item.deposit, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateTenure, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}