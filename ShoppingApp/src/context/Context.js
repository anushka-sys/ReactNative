import React, { createContext, useState ,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext(); //creates actual context object(global data container)

const CART_STORAGE_KEY = 'cart_items'; 

const Context = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); //array holding all items inside cart
  const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  const loadCart = async () => {
    try {
      const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);//getitems from storage
      if (stored !== null) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoaded(true); 
    }
  };
  loadCart();
}, []);

// save effect only runs after initial load is done
useEffect(() => {
  if (!isLoaded) return; //
  const saveCart = async () => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  };
  saveCart();
}, [cartItems, isLoaded]);


  // Add Item
  const addToCart = (product) => {
  const item = cartItems.find((i) => i.id === product.id);

  if (item) {                           //checks if item exists
    item.quantity = item.quantity + 1;
    setCartItems([...cartItems]);
  } else {
    product.quantity = 1;
    setCartItems([...cartItems, product]); 
  }
};

  // Remove Item
  const removeFromCart = (productId) => {
    const filtered = cartItems.filter(item => item.id !== productId); //if ids dont match keep
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

//   const increaseQuantity = (productId) => {
//   const updatedCart = cartItems.map((item) => {
//     if (item.id === productId) {
//       item.quantity = item.quantity + 1;
//     }
//     return item;
//   });

//   setCartItems(updatedCart);
// };

  // Decrease Quantity
  const decreaseQuantity = (productId) => {
    const updated = cartItems
      .map(item =>
      {
        if(item.id === productId){
          if(item.quantity === 1) return item;
          return{...item,quantity:item.quantity - 1}
        }
        return item;
      }
        // item.id === productId
        //   ? { ...item, quantity: item.quantity - 1 }
        //   : item
      )
      // .filter(item => item.quantity > 0); // remove if 0
      
    setCartItems(updated);
  };

  // Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity, //actions
        decreaseQuantity,
        clearCart,
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default Context;