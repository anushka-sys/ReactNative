import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { GetApi } from '../services/ApiServices';
import AppHeader from '../components/AppHeader';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Filter from '../components/Filter';
import { colors, fontSizes, layout,spacing,fontWeights } from '../styles';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  let filteredProducts = products;
//search text
  if (searchText !== '') {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  }

  //category filter
  if (selectedCategory !== 'All') {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase().includes(selectedCategory.toLowerCase()),
    );
  }

  //sort
  if (sortOrder === 'low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sortOrder === 'high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }


  const loadProducts = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    const data = await GetApi(); //pause until api is fetched
    setProducts(data);

    if (isRefresh) setRefreshing(false);
    else setLoading(false);
  };


  //refresh 
  const handleRefresh = () => {
    setSearchText('');
    setSelectedCategory('All');
    setSortOrder(null);
    setResetKey(prev => prev + 1); // tells Filter to reset itself
    loadProducts(true);
  };


  useEffect(() => {
    loadProducts();
  }, []);


  return (
    <View style={styles.container}>
      {/* header */}

      <AppHeader />

      <SearchBar value={searchText} onChangeText={setSearchText} />

    {/* filter */}
      <Filter
        onSelectCategory={setSelectedCategory}
        onSelectSort={setSortOrder}
        resetKey={resetKey}
      />

      <View style={styles.categoryRow}>
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => setSelectedCategory('All')}
        >
          <Image
            source={require('../assets/makeup.png')}
            style={styles.categoryIcon}
          />
          <Text style={styles.categoryText}>Makeup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => setSelectedCategory("women's clothing")}
        >
          <Image
            source={require('../assets/fashion.png')}
            style={styles.categoryIcon}
          />
          <Text style={styles.categoryText}>Fashion</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => setSelectedCategory('electronics')}
        >
          <Image
            source={require('../assets/kids.png')}
            style={styles.categoryIcon}
            
          />
          <Text style={styles.categoryText}>Electronic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => setSelectedCategory("men's clothing")}
        >
          <Image
            source={require('../assets/mens.png')}
            style={styles.categoryIcon}
          />
          <Text style={styles.categoryText}>Mens</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => setSelectedCategory("women's clothing")}
        >
          <Image
            source={require('../assets/woemns.png')}
            style={styles.categoryIcon}
          />
          <Text style={styles.categoryText}>Womens</Text>
        </TouchableOpacity>
      </View>

      {/* flatlist */}
      <ProductList
        products={filteredProducts}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing['4xl'],
    paddingLeft: spacing.md,
  },
  categoryIcon: {
    height: layout.categoryIconSize,
    width: layout.categoryIconSize,
  },
  categoryItem: {
    alignItems: 'center',
  },

  categoryText: {
    marginTop: spacing.xs,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semiBold,
    color: colors.textPrimary,
  },
});
