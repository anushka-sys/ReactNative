import React from "react";
import { View, Text, Image, FlatList, StyleSheet,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProductList = ({ products }) => {
const navigation = useNavigation ();

  const renderItem = ({ item }) => (
   <TouchableOpacity style={styles.productCard} 
   onPress={() => navigation.navigate('ProductDetails', { product: item })}
   >
     <View>
      <Image source={{ uri: item.image }} style={styles.productImage} />

      <View style={styles.productInfo}>
        <Text numberOfLines={1} style={styles.productTitle}>
          {item.title}
        </Text>

        <Text numberOfLines={2} style={styles.productDesc}>
          {item.description}
        </Text>

        <Text style={styles.productPrice}>₹ {item.price}</Text>

        <Text style={styles.productRating}>
          ⭐ {item.rating?.rate} ({item.rating?.count})
        </Text>
      </View>
    </View>
   </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={renderItem}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  productCard: {
    width: "47%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    margin: 5,
    overflow: "hidden",
    elevation: 2,
    paddingTop: 10,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 14,
  },
  productDesc: {
    fontSize: 11,
    color: "#666",
    marginVertical: 4,
  },
  productPrice: {
    fontWeight: "bold",
    color: "#000",
  },
  productRating: {
    fontSize: 10,
    color: "#AAA",
    marginTop: 5,
  },
});