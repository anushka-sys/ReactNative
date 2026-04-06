import React, { createContext, useContext, useState } from 'react';

// Step 1: Create the Context object
// This is like a "global box" that any screen can read from or write to
const CartContext = createContext();

// Step 2: Create the Provider component
// This wraps your entire app and makes cart data available everywhere
export const CartProvider = ({ children }) => {

  // cartItems is an array of products with quantity
  // Example: [{ id: 1, title: "Nike", price: 1500, image: "...", quantity: 2 }]
  const [cartItems, setCartItems] = useState([]);

  // ➕ Add a product to the cart
  // If it already exists, do nothing (we handle that check in ProductDetails)
  const addToCart = (product) => {
    const alreadyInCart = cartItems.find(item => item.id === product.id);
    if (alreadyInCart) {
      return; // Product already exists, don't add again
    }
    // Add product with quantity = 1
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  // ❌ Remove a product from the cart completely
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
  };

  // ➕ Increase quantity of a specific product
  const increaseQty = (productId) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 }; // increase by 1
      }
      return item; // return other items unchanged
    });
    setCartItems(updatedCart);
  };

  // ➖ Decrease quantity — if quantity becomes 0, remove from cart
  const decreaseQty = (productId) => {
    const updatedCart = cartItems
      .map(item => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter(item => item.quantity > 0); // remove if quantity hits 0
    setCartItems(updatedCart);
  };

  // 🗑️ Clear the entire cart at once
  const clearCart = () => {
    setCartItems([]);
  };

  // 💰 Calculate total price of all items
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // Step 3: Return the Provider with all cart data and functions
  // Any screen inside <CartProvider> can access these via useCart()
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        getTotalPrice,
      }}>
      {children}
    </CartContext.Provider>
  );
};

// Step 4: Custom hook — makes it easy to use cart in any screen
// Usage: const { cartItems, addToCart } = useCart();
export const useCart = () => useContext(CartContext);