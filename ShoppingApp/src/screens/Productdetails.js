import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { CartContext } from '../context/Context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconarrow from 'react-native-vector-icons/Entypo';

const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Iconarrow name="chevron-thin-left" size={20} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity >
          <Icon name="cart-outline" size={22} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.image}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="contain"
        />6-
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.rating}>
          ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
        </Text>
        <Text style={styles.price}>₹{product.price}</Text>
        <Text style={styles.info}>Product Info</Text>
        <Text numberOfLines={2} style={styles.desc}>
          {product.description}
        </Text>

        <View style={styles.cartButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addToCart(product)}
          >
            <Icon
              name="cart-outline"
              size={20}
              color="white"
              style={styles.cartIcon}
            />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    margin: 5,
  },
  header: {
    padding: 13,
    //backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 280,
  },
  backText: {
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: '500',
  },
  Image: {},
  productImage: {
    width: '97%',
    height: 180,
    // borderWidth: 1,
    // borderRadius: 5,
    marginLeft: 5,
    resizeMode: 'contain',
  },
  textcontainer: {
    flex: 1,
    gap: 5,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  rating: {
    color: '#828282',
    fontSize: 14,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    color: '#000000',
  },

  cartButtonContainer: {
    marginTop:5,
    height: 35, 
    width: 130,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: '#3F92FF',
    overflow: 'hidden', 
  },
  button: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    margin:5
  },
});
