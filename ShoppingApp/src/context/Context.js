import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const Context = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add Item
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

  // Remove Item
  const removeFromCart = (productId) => {
    const filtered = cartItems.filter(item => item.id !== productId);
    setCartItems(filtered);
  };

  // Increase Quantity
  const increaseQuantity = (productId) => {
    const updated = cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updated);
  };

  // Decrease Quantity
  const decreaseQuantity = (productId) => {
    const updated = cartItems
      .map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0); // remove if 0

    setCartItems(updated);
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total Price
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default Context;
