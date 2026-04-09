import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GetApi } from '../services/ApiServices';
import AppHeader from '../components/AppHeader';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Filter from '../components/Filter'

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const filteredProducts = products.filter(product => {
    if (searchText === '') return true;
    return product.title.toLowerCase().includes(searchText.toLowerCase());
  });
           
  useEffect(() => {
    const loadUsers = async () => {
      const data = await GetApi();
      console.log('data:', data);
      setProducts(data);
    };
    loadUsers();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AppHeader />

        <SearchBar value={searchText} onChangeText={setSearchText} />
          <Filter />
        
        <View style={styles.imgcontainer}>
          <Image
            source={require('../assets/makeup.png')}
            style={styles.makeup}
          />
          <Image
            source={require('../assets/fashion.png')}
            style={styles.makeup}
          />
          <Image source={require('../assets/kids.png')} style={styles.makeup} />
          <Image source={require('../assets/mens.png')} style={styles.makeup} />
          <Image
            source={require('../assets/woemns.png')}
            style={styles.makeup}
          />
        </View>
        <ProductList products={filteredProducts} />
      </View>
    </SafeAreaProvider>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 17,
    flex: 1,
  },
  menucontainer: {
    flexDirection: 'row',
    gap: 70,
  },
  profile: {
    // height:30,
    // width:30,
  },
  searchSection: {
    paddingHorizontal: 10,
    //marginBottom: 20,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    //borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: '#BBBBBB',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterButtons: {
    flexDirection: 'row',
  },
  chip: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 7,
  },
  makeup: {
    height: 50,
    width: 50,
  },
});
