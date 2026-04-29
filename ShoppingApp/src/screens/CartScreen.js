import React, { useContext, useState } from 'react';
import {View,Text,Image,TouchableOpacity,StyleSheet,ScrollView,} from 'react-native';
import { CartContext } from '../context/Context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconarrow from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import {colors,fontSizes,fontWeights,spacing,radius,layout,Color,} from '../styles';
import { ThemeContext } from '../context/ThemeContext';
import { ModalPopup } from '../components/Modalscreen';

const CartScreen = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  const [paymentVisible, setPaymentVisible] = useState(false);

  let totalAmount = 0;
  cartItems.forEach(item => {
    totalAmount += item.price * item.quantity;
  });

  return (
    <View style={styles.container}>
      <ModalPopup
        visible={paymentVisible}
        onClose={() => setPaymentVisible(false)}
      />
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <Iconarrow
          name="chevron-thin-left"
          size={20}
          color={theme.textPrimary}
          style={styles.back}
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* product cards */}
        {cartItems.map(item => (
          <View style={styles.card} key={item.id}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.details}>
              <Text numberOfLines={1} style={styles.title}>
                {item.title}
              </Text>
              <Text numberOfLines={2} style={styles.subtitle}>
                {item.description}
              </Text>
              <Text style={styles.subtitle}>{item.category}</Text>
              <Text style={styles.subtitle}>⭐ {item.rating.rate}</Text>

              <View style={styles.qtyRow}>
                <Text style={styles.qtyLabel}>Qty</Text>

                <View style={styles.qtySelector}>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id)}
                    disabled={item.quantity === 1}
                  >
                    <Text style={styles.qtyBtn}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                    <Text style={styles.qtyBtn}>+</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Icon
                    name="delete"
                    size={20}
                    color={colors.danger}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* coupon */}
        <View style={styles.coupon}>
          <Image
            source={require('../assets/coupon.png')}
            style={styles.couponImg}
          />
          <Text style={styles.couponTxt}>Apply Coupons</Text>
          <Text style={styles.couponLink}>Select</Text>
        </View>

        {/* order details */}
        <View style={styles.paymentCard}>
          <Text style={styles.paymentTitle}>Order Payment Details</Text>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Order Amounts</Text>
            <Text style={styles.rowValue}>₹ {totalAmount.toFixed(2)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Delivery Fee</Text>
            <Text style={styles.freeText}>Free</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Order Total</Text>
            <Text style={styles.totalValue}>₹ {totalAmount.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.checkoutBar}>
        <View>
          <Text style={styles.bottomPrice}>₹ {totalAmount.toFixed(2)}</Text>
          <Text style={styles.viewDetails}>View Details</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => setPaymentVisible(true)}
        >
          <Text style={styles.checkoutButtonTxt}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    header: {
      fontWeight: fontWeights.bold,
      padding: spacing['3xl'],
      backgroundColor: theme.backgroundPrimary,
    },
    back: {
      paddingTop: spacing.sm,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: theme.backgroundMuted,
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
      color: theme.textPrimary,
    },
    subtitle: {
      color: colors.textMuted,
      marginTop: spacing.xxs,
      fontSize: fontSizes.md,
      color: theme.textSecondary,
    },

    qtyRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.md,
    },
    qtyLabel: {
      marginRight: spacing.md,
      color: theme.textPrimary,
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
      color: theme.textPrimary,
    },
    qtyText: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: theme.textPrimary,
    },
    deleteIcon: {
      padding: spacing.iconPadding,
      marginLeft: 55,
    },

    coupon: {
      marginTop: spacing.lg,
      backgroundColor: theme.backgroundPrimary,
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
      color: theme.textPrimary,
    },
    couponLink: {
      color: colors.primary,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.medium,
      paddingLeft: 120,
    },

    paymentCard: {
      backgroundColor: theme.backgroundPrimary,
      marginTop: spacing.cardSpacing,
      padding: spacing.paymentPadding,
    },
    paymentTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      marginBottom: spacing.xl,
      color: theme.textPrimary,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: spacing.xs + spacing.xxs,
    },
    rowLabel: {
      color: theme.textPrimary,
    },
    rowValue: {
      fontWeight: fontWeights.semiBold,
      color: theme.textPrimary,
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
      color: theme.textPrimary,
    },
    totalValue: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: theme.textPrimary,
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
      left: 0,
      right: 0,
      height: 80,
      backgroundColor: theme.backgroundPrimary,
      borderTopWidth: 1,
      borderColor: '#E5E7EB',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },

    bottomPrice: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.textPrimary,
    },

    viewDetails: {
      fontSize: 12,
      color: Color.primary,
      marginTop: 4,
    },

    checkoutButton: {
      width: 219,
      height: 48,
      borderRadius: 5,
      backgroundColor: Color.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },

    checkoutButtonTxt: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });
