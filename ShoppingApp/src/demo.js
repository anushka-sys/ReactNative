import React, { useContext, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconarrow from 'react-native-vector-icons/Entypo';
import { ThemeContext } from '../context/ThemeContext';
import { CartContext } from '../context/Context';
import { colors, fontSizes, fontWeights, spacing, radius, layout, Color } from '../styles';

const WISHLIST_KEY = 'wishlist_items';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const { addToCart } = useContext(CartContext);
  const styles = getStyles(theme);

  const [wishlist, setWishlist] = useState([]);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(WISHLIST_KEY)
        .then(stored => setWishlist(stored ? JSON.parse(stored) : []))
        .catch(console.error);
    }, [])
  );

  const removeItem = async (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  };

  const clearAll = async () => {
    setWishlist([]);
    await AsyncStorage.removeItem(WISHLIST_KEY);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>

        {/* Bottom buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => addToCart(item)}
          >
            <Icon name="cart-outline" size={14} color="#FFF" />
            <Text style={styles.addBtnTxt}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => removeItem(item.id)}
          >
            <Text style={styles.removeBtnTxt}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconarrow name="chevron-thin-left" size={20} color={theme.textPrimary} />
        </TouchableOpacity>

        <Text style={styles.screenTitle}>My Wishlist</Text>

        {wishlist.length > 0 && (
          <TouchableOpacity onPress={clearAll}>
            <Text style={styles.clearTxt}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={wishlist.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContent}>
            <Icon name="heart-outline" size={64} color={colors.borderLight} />
            <Text style={styles.emptyText}>No liked items yet</Text>
          </View>
        }
      />
    </View>
  );
};

export default WishlistScreen;

const getStyles = theme => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.backgroundPrimary },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['3xl'],
    paddingTop: spacing['3xl'],
    paddingBottom: spacing.md,
  },
  screenTitle: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    color: theme.textPrimary,
  },
  clearTxt: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: colors.danger,
  },

  listContent: { paddingHorizontal: spacing.lg, paddingBottom: 40 },

  // Card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.backgroundMuted,
    borderRadius: 12,
    padding: spacing.cardPadding,
    marginBottom: spacing.lg,
  },
  image: {
    width: layout.cartProductImageWidth,
    height: layout.cartProductImageHeight,
    borderRadius: radius.image,
    resizeMode: 'contain',
  },
  info: { flex: 1, marginLeft: spacing.lg },
  title: { fontSize: fontSizes.lg, fontWeight: fontWeights.semiBold, color: theme.textPrimary },
  category: { fontSize: fontSizes.sm, color: theme.textSecondary, marginTop: spacing.xxs },
  price: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: theme.textPrimary, marginTop: spacing.xs },

  // Buttons
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Color.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 6,
  },
  addBtnTxt: {
    color: '#FFF',
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semiBold,
  },
  removeBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  removeBtnTxt: {
    color: colors.danger,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semiBold,
  },

  // Empty state
  emptyContainer: { flex: 1 },
  emptyContent: { flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '50%' },
  emptyText: { fontSize: fontSizes.xl, color: theme.textSecondary, marginTop: spacing.lg },
});