import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WishlistContext = createContext();

const WISHLIST_KEY = 'wishlist_items';

const WishlistProvider = ({ children }) => {
  const [wishlistId, setWishlistId] = useState([]);
  const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     AsyncStorage.getItem(WISHLIST_KEY)
//       .then(stored => {
//         if (stored) {
//           const items = JSON.parse(stored);
//           setWishlist(items);
//           setWishlistId(items.map(i => i.id));
//         }
//       })
//       .catch(console.error);
//   }, []);

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const stored = await AsyncStorage.getItem(WISHLIST_KEY);
        if (stored) {
          const items = JSON.parse(stored);
          setWishlist(items);
          setWishlistId(items.map(item => item.id));
        }
      } catch (error) {
        console.error('error');
      }
    };
    loadWishlist();
  }, []);

  const toggleWishlist = async(product) =>{
    try{
    const isLiked = wishlistId.includes(product.id);
    const updatedItems = isLiked ? wishlist.filter(item=> item.id !==product.id) : [...wishlist,product];
    setWishlist(updatedItems);
    setWishlistId(updatedItems.map(i => i.id));
    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedItems));
    }catch(error){
        console.error('failed to update')
    }
  }

  const removeItem = async (id) => {
    const updatedItems = wishlist.filter(item => item.id !== id);
    setWishlist(updatedItems);
    setWishlistId(updatedItems.map(i => i.id));
    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedItems));
  };

  const clearAll = async () =>{
    setWishlist([]);
    setWishlistId([]);
    await AsyncStorage.removeItem(WISHLIST_KEY);
  };

  return (
    <WishlistContext.Provider
    value={{
        wishlist,
        wishlistId,
        wishlistCount: wishlist.length,
        toggleWishlist,
        removeItem,
        clearAll,
    }}
    >
        {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
