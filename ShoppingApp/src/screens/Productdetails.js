import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { CartContext } from '../context/Context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconarrow from 'react-native-vector-icons/Entypo';
import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  radius,
  layout,
} from '../styles';
import { ThemeContext } from '../context/ThemeContext';

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();
  const { addToCart, cartItems, removeFromCart } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  const isInCart = cartItems.some(item => item.id === product.id);

  const handleCartPress = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Iconarrow
            name="chevron-thin-left"
            size={20}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity >
          <Icon name="cart-outline" size={25} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>

      {/* image */}
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="contain"
      />

      {/* product info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.rating}>
          ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
        </Text>
        <Text style={styles.price}>₹{product.price}</Text>
        <Text style={styles.infoLabel}>Product Info</Text>
        <Text numberOfLines={3} style={styles.description}>
          {product.description}
        </Text>

        {/* add to cart */}
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            { backgroundColor: isInCart ? '#ff3b30' : colors.success },
          ]}
          onPress={handleCartPress}
        >
          <Icon
            name={isInCart ? 'trash-outline' : 'cart-outline'}
            size={20}
            color={colors.textOnPrimary}
          />
          <Text style={styles.addToCartText}>
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    header: {
      padding: spacing.cardSpacing,
      flexDirection: 'row',
      gap: layout.space,
      paddingTop: 20,
    },
    headerIcon: {
      color: theme.textPrimary,
    },
    productImage: {
      width: '97%',
      height: layout.productDetailImageHeight,
      marginLeft: spacing.sm,
      resizeMode: 'contain',
    },
    infoContainer: {
      flex: 1,
      gap: spacing.sm,
      padding: spacing.cardPaddingInfo,
    },
    title: {
      fontSize: fontSizes['4xl'],
      fontWeight: fontWeights.semiBold,
      color: theme.textPrimary,
    },
    rating: {
      color: colors.textLight,
      fontSize: fontSizes.lg,
    },
    price: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.medium,
      color: theme.textPrimary,
    },
    infoLabel: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: theme.textPrimary,
    },
    description: {
      fontSize: fontSizes.base,
      color: theme.textPrimary,
    },
    addToCartButton: {
      marginTop: spacing.sm,
      height: layout.addToCartButtonHeight,
      width: layout.addToCartButtonWidth,
      borderWidth: 1,
      borderColor: colors.backgroundPrimary,
      borderRadius: radius.addToCart,
      backgroundColor: colors.success,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
      overflow: 'hidden',
    },
    addToCartText: {
      color: colors.textOnPrimary,
      fontSize: fontSizes.lg,
      marginLeft: spacing.sm,
    },
  });

//   <TouchableOpacity
//   style={[
//     styles.addToCartButton,
//     { backgroundColor: isInCart ? '#ff3b30' : colors.success }
//   ]}
//   onPress={handleCartPress}
// >
//   <Icon
//     name={isInCart ? "trash-outline" : "cart-outline"}
//     size={20}
//     color={colors.textOnPrimary}
//   />
//   <Text style={styles.addToCartText}>
//     {isInCart ? "Remove from Cart" : "Add to Cart"}
//   </Text>
// </TouchableOpacity>
