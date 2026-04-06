import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const ProductDetails = ({ route }) => {
  // Step 1: Get the product passed from HomeScreen via navigation
  const { product } = route.params;

  const navigation = useNavigation();

  // Step 2: Get cart functions from our global CartContext
  const { cartItems, addToCart } = useCart();

  // Step 3: Check if this product is already in the cart
  // Find returns the item if found, or undefined if not
  const isInCart = cartItems.find(item => item.id === product.id);

  // Step 4: Handle Add to Cart button press
  const handleAddToCart = () => {
    addToCart(product); // add this product to global cart
  };

  return (
    <View style={styles.screen}>
      {/* Top Bar with Back button and Cart icon */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartBtn}>
          <Text style={styles.cartIcon}>🛒</Text>
          {/* Show badge if items are in cart */}
          {cartItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="contain"
        />

        {/* Product Details Card */}
        <View style={styles.detailsCard}>
          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{product.title}</Text>

          {/* Rating */}
          <Text style={styles.rating}>
            ⭐ {product.rating?.rate}  ({product.rating?.count} reviews)
          </Text>

          {/* Price */}
          <Text style={styles.price}>₹ {product.price}</Text>

          {/* Description heading */}
          <Text style={styles.descHeading}>Product Details</Text>

          {/* Description text */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomBar}>
        {/* Go to Cart Button */}
        <TouchableOpacity
          style={styles.goToCartBtn}
          onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.goToCartText}>🛒  Go to Cart</Text>
        </TouchableOpacity>

        {/* Add to Cart / Already Added Button */}
        <TouchableOpacity
          style={[styles.addToCartBtn, isInCart && styles.disabledBtn]}
          onPress={handleAddToCart}
          disabled={!!isInCart} // disable if already in cart
        >
          <Text style={styles.addToCartText}>
            {isInCart ? '✔ Added' : '🛍 Buy Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  backBtn: {
    padding: 6,
  },
  backText: {
    fontSize: 32,
    color: '#333',
    lineHeight: 34,
  },
  cartBtn: {
    padding: 6,
    position: 'relative',
  },
  cartIcon: {
    fontSize: 26,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: '#F83758',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 280,
    backgroundColor: '#FFF',
  },
  detailsCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: -20,
  },
  categoryBadge: {
    backgroundColor: '#FFF0F3',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  categoryText: {
    color: '#F83758',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  rating: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
  },
  price: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F83758',
    marginBottom: 16,
  },
  descHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
    marginBottom: 100, // space for bottom bar
  },
  bottomBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 14,
    gap: 12,
    elevation: 10,
  },
  goToCartBtn: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#F83758',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  goToCartText: {
    color: '#F83758',
    fontWeight: '700',
    fontSize: 15,
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: '#F83758',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledBtn: {
    backgroundColor: '#CCC', // grey out when already in cart
  },
  addToCartText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },
});