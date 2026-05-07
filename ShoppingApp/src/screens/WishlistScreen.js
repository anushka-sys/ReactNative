import React, { useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconarrow from 'react-native-vector-icons/Entypo';
import { ThemeContext } from '../context/ThemeContext';
import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  radius,
  layout,
} from '../styles';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/Context';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const { wishlist, removeItem, clearAll } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const styles = getStyles(theme);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>

        <View style={styles.btn}>
          <TouchableOpacity style={styles.addbtn} onPress={()=> addToCart(item)}>
            <Text style={styles.addtxt}>Add</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.removebtn} onPress={()=> removeItem(item.id)}>
            <Text  style={styles.rmvtxt}>Remove</Text> 
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <Iconarrow
          name="chevron-thin-left"
          size={20}
          color={theme.textPrimary}
        />
      </TouchableOpacity>

      <View style={styles.headertxt}>
        <Text style={styles.screenTitle}>My Wishlist</Text>
        <TouchableOpacity style={styles.clrtxt}>
          <Text>Clear</Text>
        </TouchableOpacity>
      </View> */}
      
      <FlatList
        data={wishlist}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={
          wishlist.length === 0 ? styles.emptyContainer : styles.listContent
        }
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

const getStyles = theme =>
  StyleSheet.create({
    container: 
    { 
      flex: 1, 
      backgroundColor: theme.backgroundPrimary 
    },
    header: { 
      padding: spacing['3xl'], 
      paddingBottom: spacing.sm
     },
    screenTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: theme.textPrimary,
      paddingHorizontal: spacing['3xl'],
      paddingBottom: spacing.md,
    },
    listContent: { 
      paddingHorizontal: spacing.lg, 
      paddingBottom: 40 
    },

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
    title: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: theme.textPrimary,
    },
    category: {
      fontSize: fontSizes.sm,
      color: theme.textSecondary,
      marginTop: spacing.xxs,
    },
    price: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: theme.textPrimary,
      marginTop: spacing.xs,
    },

    // Delete
    deleteBtn: { padding: spacing.sm },

    // Empty state
    emptyContainer: { flex: 1 },
    emptyContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '50%',
    },
    emptyText: {
      fontSize: fontSizes.xl,
      color: theme.textSecondary,
      marginTop: spacing.lg,
    },
    btn:{
      flexDirection:'row',
      gap:20,
     // padding:20,
     paddingTop:10,
    },
    addbtn:{
      borderRadius:2,
      borderWidth:1,
      backgroundColor: '#6495ED',
      paddingVertical:5,
      paddingHorizontal:15,
    },
    removebtn:{
      borderRadius:2,
      borderWidth:1,
      backgroundColor: '#d20000',
      paddingVertical:5,
      paddingHorizontal:15,
    },
    headertxt:{
      flexDirection:'row',
      gap:60,
    }
  });