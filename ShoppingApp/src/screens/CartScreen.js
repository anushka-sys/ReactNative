import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
  // Step 1: Get cart data and functions from global CartContext
  const { cartItems, removeFromCart, increaseQty, decreaseQty, getTotalPrice, clearCart } = useCart();

  // Step 2: Render each cart item
  const renderItem = ({ item }) => (
    <View style={styles.cartCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <View style={styles.itemInfo}>
        <Text numberOfLines={2} style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>Rs. {item.price}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => decreaseQty(item.id)}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyCount}>{item.quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => increaseQty(item.id)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromCart(item.id)}>
            <Text style={styles.removeBtnText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Step 3: Show empty state if cart is empty
  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Go add some products!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Bag</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Order Summary */}
      <View style={styles.summaryBox}>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Order Amount</Text>
          <Text style={styles.summaryValue}>Rs. {getTotalPrice().toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={[styles.summaryValue, { color: '#27AE60' }]}>Free</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Order Total</Text>
          <Text style={styles.totalValue}>Rs. {getTotalPrice().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 18, paddingTop: 55, paddingBottom: 14,
    backgroundColor: '#FFF', elevation: 2,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  clearText: { fontSize: 13, color: '#F83758', fontWeight: '600' },
  cartCard: {
    flexDirection: 'row', backgroundColor: '#FFF',
    marginHorizontal: 14, marginTop: 12, borderRadius: 14,
    elevation: 2, padding: 10, gap: 10,
  },
  itemImage: { width: 90, height: 90, borderRadius: 10, backgroundColor: '#F9F9F9' },
  itemInfo: { flex: 1, justifyContent: 'space-between' },
  itemTitle: { fontSize: 13, fontWeight: '600', color: '#1A1A1A' },
  itemPrice: { fontSize: 15, fontWeight: 'bold', color: '#F83758', marginVertical: 4 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: 8, backgroundColor: '#F0F0F0',
    justifyContent: 'center', alignItems: 'center',
  },
  qtyBtnText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  qtyCount: { fontSize: 16, fontWeight: 'bold', minWidth: 24, textAlign: 'center', color: '#1A1A1A' },
  removeBtn: { marginLeft: 'auto', padding: 4 },
  removeBtnText: { fontSize: 14, color: '#F83758', fontWeight: 'bold' },
  summaryBox: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#FFF', paddingHorizontal: 20, paddingTop: 12,
    paddingBottom: 24, elevation: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20,
  },
  divider: { height: 1, backgroundColor: '#EEEEEE', marginVertical: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  summaryLabel: { fontSize: 14, color: '#888' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#333' },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  totalValue: { fontSize: 16, fontWeight: 'bold', color: '#F83758' },
  checkoutBtn: {
    backgroundColor: '#F83758', borderRadius: 14,
    paddingVertical: 14, alignItems: 'center', marginTop: 12,
  },
  checkoutText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
  emptyIcon: { fontSize: 60 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  emptySubtitle: { fontSize: 14, color: '#999' },
});
