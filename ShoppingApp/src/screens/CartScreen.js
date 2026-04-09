import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { CartContext } from '../context/Context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconarrow from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const {
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getTotalPrice,
  } = useContext(CartContext);

  // total calculation
  let totalAmount = 0;
  cartItems.forEach(item => {
    totalAmount = totalAmount + item.price * item.quantity;
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* HEADER */}
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.goBack()}
        >
          <Iconarrow
            name="chevron-thin-left"
            size={20}
            color="#323232"
            style={styles.back}
          />
        </TouchableOpacity>

        {/* PRODUCT CARD */}
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

              {/* Qty Selector */}
              <View style={styles.qtyRow}>
                <Text style={styles.qtyLabel}>Qty</Text>

                <View style={styles.qtySelector}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                    <Text style={styles.qtyBtn}>{'-'}</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyText}>{item.quantity}</Text>

                  <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                    <Text style={styles.qtyBtn}>{'+'}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Icon
                    name="delete"
                    size={20}
                    color="red"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.coupon}>
          <Image source={require('../assets/coupon.png')} style={styles.couponimg}/>
          <Text style={styles.coupontxt}>Apply Coupons</Text>
          <Text style={styles.coupontxts}>Select</Text>
        </View>

        {/* ORDER PAYMENT DETAILS */}
        <View style={styles.paymentCard}>
          <Text style={styles.paymentTitle}>Order Payment Details</Text>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Order Amounts</Text>
            <Text style={styles.rowValue}>₹ {totalAmount.toFixed(0)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Delivery Fee</Text>
            <Text style={styles.free}>Free</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.totalLabel}>Order Total</Text>
            <Text style={styles.totalValue}>₹ {totalAmount.toFixed(0)}</Text>
          </View>

          <View style={styles.emicontainer}>
            <Text style={styles.emit}>EMI Available</Text>
          <Text style={styles.emi}>Details</Text>
          </View>

         
        </View>
        <View style={styles.bottomcontainer} >
           <TouchableOpacity style={styles.bottom}>
            <Text style={styles.bottomtxt}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    // fontSize: 20,
    fontWeight: '700',
    padding: 15,
    backgroundColor: '#fff',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    marginTop: 10,
  },

  image: {
    width: 123,
    height: 153,
    borderRadius: 8,
    resizeMode: 'contain',
  },

  details: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
  },

  subtitle: {
    color: '#777',
    marginTop: 2,
    fontSize: 13,
  },

  meta: {
    marginTop: 6,
    color: '#777',
  },

  bold: {
    fontWeight: '700',
    color: '#000',
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  qtyLabel: {
    marginRight: 8,
    color: '#777',
  },

  qtySelector: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
  },

  qtyBtn: {
    fontSize: 18,
    paddingHorizontal: 8,
  },

  qtyText: {
    fontSize: 14,
    fontWeight: '600',
  },

  delivery: {
    marginTop: 8,
    color: '#777',
    fontSize: 12,
  },

  paymentCard: {
    backgroundColor: '#fff',
    marginTop: 14,
    padding: 16,
  },

  paymentTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  rowValue: {
    fontWeight: '600',
  },

  free: {
    color: '#F83758',
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },

  totalValue: {
    fontSize: 16,
    fontWeight: '700',
  },

  emi: {
    marginTop: 6,
    color: '#F83758',
    fontSize: 12,
    paddingLeft:210,
  },
  icon: {
    padding: 10,
    marginLeft: 55,
  },
  back: {
    paddingTop: 5,
  },

  couponimg :{
    height:20,
    width:31,
  },
  coupon:{
    marginTop:10,
    backgroundColor:'#fff',
    padding:7,
    paddingLeft:20,
    flexDirection:'row',
    gap:15,
  },
  coupontxt:{
    fontSize:15,
  },
  coupontxts:{
    color:'#F83758',
    fontSize:12,
    fontWeight:'500',
    paddingLeft:120,
  },
  emicontainer:{
    flexDirection:'row',
  },
  emit:{
    marginTop: 5,
  },
  bottomcontainer:{
    borderWidth:1,
    borderRadius:5,
    borderColor:'red',
    height:48,
    width:219,
    backgroundColor:'#F83758',
    alignItems:'center',
    justifyContent:'center',
    //position:'absolute',
    marginBottom:100,
    marginLeft:130,
  },
  bottomtxt:{
    color:'white',
    fontWeight:'500',
    fontSize:15,
  }

});
