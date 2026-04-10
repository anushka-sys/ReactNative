import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GetApi } from '../services/ApiServices';
import AppHeader from '../components/AppHeader';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Filter from '../components/Filter';
import {
  colors,
  fontSizes,
  fontWeights,
  spacing,
  radius,
  shadows,
  layout,
} from '../styles';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      searchText === '' ||
      product.title.toLowerCase().includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      product.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const loadUsers = async () => {
      const data = await GetApi();
      setProducts(data);
    };
    loadUsers();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppHeader />
        <SearchBar value={searchText} onChangeText={setSearchText} />
        <Filter onSelectCategory={setSelectedCategory} />
        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryItem}>
            <Image
              source={require('../assets/makeup.png')}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryText}>Makeup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}>
            <Image
              source={require('../assets/fashion.png')}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryText}>Fashion</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}>
            <Image
              source={require('../assets/kids.png')}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryText}>Kids</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}
          onPress={() => setSelectedCategory("men's clothing")}
          >
            <Image
              source={require('../assets/mens.png')}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryText}>Mens</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryItem}>
            <Image
              source={require('../assets/woemns.png')}
              style={styles.categoryIcon}
            />
            <Text style={styles.categoryText}>Womens</Text>
          </TouchableOpacity>
        </View>
        <ProductList products={filteredProducts} />
      </View>
    </SafeAreaProvider>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    padding: spacing.screenPadding,
    paddingTop: spacing.screenPaddingTop,
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xs + spacing.xxs,
  },
  categoryIcon: {
    height: layout.categoryIconSize,
    width: layout.categoryIconSize,
  },
  categoryItem: {
    alignItems: 'center',
  },

  categoryText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
