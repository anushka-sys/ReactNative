import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';

const ProductList = ({ products, refreshing, onRefresh }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.cardWrapper}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.productCard}>
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

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  row: {
    marginBottom: 16,
  },
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 8,
    maxWidth: '50%',
  },
  productCard: {
    backgroundColor: '#FFF',
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
    color: '#000',
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
    color: '#000',
  },

  productRating: {
    fontSize: 10,
    marginTop: 4,
    color: '#A4A9B3',
  },
});
