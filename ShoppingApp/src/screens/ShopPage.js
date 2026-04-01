import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// Mock Data
const CATEGORIES = [
  { id: '1', name: 'Beauty', img: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Fashion', img: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Kids', img: 'https://via.placeholder.com/100' },
  { id: '4', name: 'Mens', img: 'https://via.placeholder.com/100' },
  { id: '5', name: 'Womens', img: 'https://via.placeholder.com/100' },
];

const PRODUCTS = [
  { id: '1', title: 'Black Winter...', desc: 'Autumn And Winter Casual...', price: '₹499', rating: '4.5', reviews: '6,890' },
  { id: '2', title: 'Mens Starry', desc: 'Mens Starry Sky Printed...', price: '₹399', rating: '4.2', reviews: '1,52,344' },
  { id: '3', title: 'Black Dress', desc: 'Solid Black Dress for Women...', price: '₹2,000', rating: '4.8', reviews: '5,23,456' },
  { id: '4', title: 'Pink Embroide...', desc: 'EARTHEN Rose Pink Embroidered...', price: '₹1,900', rating: '4.3', reviews: '45,678' },
];

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.menuIcon}>☰</Text>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle} />
            <Text style={styles.logoText}>Stylish</Text>
          </View>
          <Image 
            source={{ uri: 'https://via.placeholder.com/40' }} 
            style={styles.profilePic} 
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput 
              placeholder="Search any Product.." 
              style={styles.input}
            />
            <Text style={styles.micIcon}>🎤</Text>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Featured</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity style={styles.chip}><Text>Sort ⇅</Text></TouchableOpacity>
            <TouchableOpacity style={styles.chip}><Text>Filter ▽</Text></TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesList}>
          {CATEGORIES.map((item) => (
            <View key={item.id} style={styles.categoryItem}>
              <Image source={{ uri: item.img }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Products Grid */}
        <View style={styles.productGrid}>
          {PRODUCTS.map((item) => (
            <View key={item.id} style={styles.productCard}>
              <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.productDesc} numberOfLines={2}>{item.desc}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <Text style={styles.productRating}>⭐ {item.rating} ({item.reviews})</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  menuIcon: { fontSize: 24 },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logoCircle: { width: 25, height: 25, borderRadius: 12.5, backgroundColor: '#FF4D6D', marginRight: 5 },
  logoText: { fontSize: 22, fontWeight: 'bold', color: '#4361EE' },
  profilePic: { width: 40, height: 40, borderRadius: 20 },

  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  searchIcon: { marginRight: 10, color: '#888' },
  input: { flex: 1, fontSize: 16 },
  micIcon: { marginLeft: 10, color: '#888' },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  filterButtons: { flexDirection: 'row' },
  chip: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    flexDirection: 'row',
    alignItems: 'center'
  },

  categoriesList: {
    paddingLeft: 20,
    marginVertical: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EEE',
  },
  categoryName: {
    marginTop: 5,
    fontSize: 12,
    color: '#444',
  },

  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  productCard: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  productDesc: {
    fontSize: 11,
    color: '#666',
    marginVertical: 4,
  },
  productPrice: {
    fontWeight: 'bold',
    color: '#000',
  },
  productRating: {
    fontSize: 10,
    color: '#AAA',
    marginTop: 5,
  },
});

