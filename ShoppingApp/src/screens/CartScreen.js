import React, { useContext } from 'react';
import {
  View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native';
import { CartContext } from '../context/Context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconarrow from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { colors, fontSizes, fontWeights, spacing, radius, layout } from '../styles';

const CartScreen = () => {
  const navigation = useNavigation();
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  let totalAmount = 0;
  cartItems.forEach(item => {
    totalAmount += item.price * item.quantity;
  });

  return (
  <View style={styles.container}>
    
    <ScrollView 
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >

      {/* header */}
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <Iconarrow name="chevron-thin-left" size={20} color={colors.iconMuted} style={styles.back} />
      </TouchableOpacity>

      {/* product cards */}
      {cartItems.map(item => (
        <View style={styles.card} key={item.id}>
          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={styles.details}>
            <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.subtitle}>{item.description}</Text>
            <Text style={styles.subtitle}>{item.category}</Text>
            <Text style={styles.subtitle}>⭐ {item.rating.rate}</Text>

            <View style={styles.qtyRow}>
              <Text style={styles.qtyLabel}>Qty</Text>

              <View style={styles.qtySelector}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                  <Text style={styles.qtyBtn}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                  <Text style={styles.qtyBtn}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Icon name="delete" size={20} color={colors.danger} style={styles.deleteIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* coupon */}
      <View style={styles.coupon}>
        <Image source={require('../assets/coupon.png')} style={styles.couponImg} />
        <Text style={styles.couponTxt}>Apply Coupons</Text>
        <Text style={styles.couponLink}>Select</Text>
      </View>

      {/* oder details */}
      <View style={styles.paymentCard}>
        <Text style={styles.paymentTitle}>Order Payment Details</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Order Amounts</Text>
          <Text style={styles.rowValue}>₹ {totalAmount.toFixed(0)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Delivery Fee</Text>
          <Text style={styles.freeText}>Free</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.totalLabel}>Order Total</Text>
          <Text style={styles.totalValue}>₹ {totalAmount.toFixed(0)}</Text>
        </View>

      </View>

    </ScrollView>

  
    <View style={styles.checkoutBar}>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonTxt}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>

  </View>
);
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    fontWeight: fontWeights.bold,
    padding: spacing['3xl'],
    backgroundColor: colors.backgroundPrimary,
  },
  back: {
    paddingTop: spacing.sm,
  },


  card: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundPrimary,
    padding: spacing.cardPadding,
    marginTop: spacing.lg,
  },
  image: {
    width: layout.cartProductImageWidth,
    height: layout.cartProductImageHeight,
    borderRadius: radius.image,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginLeft: spacing['3xl'],
  },
  title: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: spacing.xxs,
    fontSize: fontSizes.md,
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  qtyLabel: {
    marginRight: spacing.md,
    color: colors.textMuted,
  },
  qtySelector: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.qtySelector,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.qtyBtnPaddingV,
    alignItems: 'center',
  },
  qtyBtn: {
    fontSize: fontSizes['3xl'],
    paddingHorizontal: spacing.qtyBtnPaddingH,
  },
  qtyText: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
  },
  deleteIcon: {
    padding: spacing.iconPadding,
    marginLeft: 55,
  },


  coupon: {
    marginTop: spacing.lg,
    backgroundColor: colors.backgroundPrimary,
    padding: spacing.xs + spacing.xxs,
    paddingLeft: spacing.couponPaddingLeft,
    flexDirection: 'row',
    gap: spacing.couponGap,
  },
  couponImg: {
    height: layout.couponImageHeight,
    width: layout.couponImageWidth,
  },
  couponTxt: {
    fontSize: fontSizes.xl,
  },
  couponLink: {
    color: colors.primary,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    paddingLeft: 120,
  },

  paymentCard: {
    backgroundColor: colors.backgroundPrimary,
    marginTop: spacing.cardSpacing,
    padding: spacing.paymentPadding,
  },
  paymentTitle: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.xs + spacing.xxs,
  },
  rowLabel: {
    color: colors.textPrimary,
  },
  rowValue: {
    fontWeight: fontWeights.semiBold,
  },
  freeText: {
    color: colors.free,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.lg,
  },
  totalLabel: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
  },
  totalValue: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.bold,
  },
  emiContainer: {
    flexDirection: 'row',
  },
  emiText: {
    marginTop: spacing.sm,
  },
  emiLink: {
    marginTop: spacing.xs + spacing.xxs,
    color: colors.primary,
    fontSize: fontSizes.base,
    paddingLeft: 210,
  },

  bottomContainer: {
    borderWidth: 1,
    borderRadius: radius.cartButton,
    borderColor: colors.primaryBorder,
    height: layout.cartCheckoutButtonHeight,
    width: layout.cartCheckoutButtonWidth,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
    marginLeft: 130,
  },
scrollContent: {
  paddingBottom: 120, 
},

checkoutBar: {
  position: 'absolute',
  bottom: 0,
  left: 100,
  right: 0,
  //backgroundColor: colors.backgroundPrimary,
  padding: spacing.lg,
  borderTopWidth: 1,
  borderColor: colors.borderLight,
},

checkoutButton: {
  backgroundColor: colors.primary,
  height: 45,
  borderRadius: radius.cartButton,
  alignItems: 'center',
  justifyContent: 'center',
},

checkoutButtonTxt: {
  color: colors.textOnPrimary,
  fontWeight: fontWeights.bold,
  fontSize: fontSizes.xl,
},
});
