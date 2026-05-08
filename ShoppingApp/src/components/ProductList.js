import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { spacing } from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';
import { WishlistContext } from '../context/WishlistContext';


const ProductList = ({ products, refreshing, onRefresh }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const {wishlistId,toggleWishlist} = useContext(WishlistContext);
  const styles = getStyles(theme);

  //stars
  const renderStars = rating => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(<Icon key={i} name="star" size={12} color="#FFD700" />);
      } else if (i === filledStars && hasHalfStar) {
        stars.push(<Icon key={i} name="star-half" size={12} color="#FFD700" />);
      } else {
        stars.push(
          <Icon key={i} name="star-outline" size={12} color="#FFD700" />,
        );
      }
    }
    return stars;
  };

  const renderItem = ({ item }) => {
    const isLiked = wishlistId.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <View style={styles.productCard}>
          {/* Like Button */}
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => toggleWishlist(item)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              name={isLiked ? 'heart' : 'heart-outline'}
              size={18}
              color={isLiked ? '#E53935' : theme.textSecondary}
            />
          </TouchableOpacity>

          <Image source={{ uri: item.image }} style={styles.productImage} />

          <View style={styles.productInfo}>
            <Text numberOfLines={1} style={styles.productTitle}>
              {item.title}
            </Text>

            <Text numberOfLines={2} style={styles.productDesc}>
              {item.description}
            </Text>

            <Text style={styles.productPrice}>₹ {item.price}</Text>

            {/* <Text style={styles.productRating}>
            ⭐ {item.rating?.rate} ({item.rating?.count})
          </Text> */}
            <View style={styles.ratingContainer}>
              <View style={styles.starsWrapper}>
                {renderStars(item.rating?.rate || 0)}
              </View>
              <Text style={styles.ratingCount}>
                {' '}
                ({item.rating?.count || 0})
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.row}
      contentInset={{ bottom: 30 }}
      //refresh controls
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default ProductList;

const getStyles = theme =>
  StyleSheet.create({
    listContent: {
      paddingHorizontal: spacing['4xl'],
      paddingTop: spacing['4xl'],
      paddingBottom: spacing['7xl'],
    },
    row: {
      paddingBottom: spacing['4xl'],
    },
    cardWrapper: {
      flex: 1,
      paddingHorizontal: 8,
      maxWidth: '50%',
    },
    productCard: {
      backgroundColor: theme.backgroundMuted,
      borderRadius: 12,
      overflow: 'hidden',
    },
    productImage: {
      width: '100%',
      height: 136,
      resizeMode: 'contain',
    },

    productInfo: {
      paddingHorizontal: 8,
      paddingTop: 8,
      paddingBottom: 10,
    },

    productTitle: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      color: theme.textPrimary,
    },

    productDesc: {
      fontSize: 10,
      lineHeight: 16,
      color: '#6B7280',
      marginTop: 4,
    },

    productPrice: {
      fontSize: 12,
      fontWeight: '500',
      marginTop: 4,
      color: theme.textPrimary,
    },

    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    starsWrapper: {
      flexDirection: 'row',
    },
    ratingCount: {
      fontSize: 10,
      color: '#A4A9B3',
      marginLeft: 4,
    },
    heartButton:{
     // paddingTop:10,
     // paddingLeft:10,
    }
  });
