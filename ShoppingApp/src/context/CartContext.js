import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CartContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const filtered = cartItems.filter((item) => item.id !== productId);
    setCartItems(filtered);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
