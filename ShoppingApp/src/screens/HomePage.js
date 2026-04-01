import { StyleSheet, Text, View, TextInput, Image, FlatList, TouchableOpacity, } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import {GetApi} from '../services/ApiServices'

const HomePage = () => {
 const [users, setUsers] = useState([]);

useEffect(() => {
    const loadUsers = async () => {
    const data = await GetApi();
    setUsers(data);
  };
    loadUsers();
  }, []);
  
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.menucontainer}>
          <Image source={require('../assets/lines.png')} style={styles.menuimg} />
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Image source={require('../assets/profile.png')} style={styles.profile} />
        </View>
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={19} color="#BBBBBB" />
            <TextInput placeholder="Search any Product.." style={styles.input} />
            <Icon name="mic" size={16} color="#BBBBBB" />
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Featured</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity style={styles.chip}>
              <Text>Sort ⇅</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.chip}>
              <Text>Filter ▽</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imgcontainer}>
          <Image source={require('../assets/makeup.png')} style={styles.makeup} />
          <Image source={require('../assets/fashion.png')} style={styles.makeup} />
          <Image source={require('../assets/kids.png')} style={styles.makeup} />
          <Image source={require('../assets/mens.png')} style={styles.makeup} />
          <Image source={require('../assets/woemns.png')} style={styles.makeup} />
        </View>
        <View>
          <FlatList
            data={users}
            keyExtractor={item => item.id}
            numColumns={2} 
            renderItem={({ item }) => (
              <View key={item.id} style={styles.productCard}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle} >
                    {item.title}
                  </Text>
                  <Text style={styles.productDesc} >
                    {item.desc}
                  </Text>
                  <Text style={styles.productPrice}>{item.price}</Text>
                  <Text style={styles.productRating}> ⭐ {item.rating} ({item.reviews}) </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 30,
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
      height: 2
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
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  filterButtons: {
    flexDirection: 'row'
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
    paddingTop: 10,
  },
  makeup: {
    height: 50,
    width: 50,
  },
  /* productGrid style removed */
  productCard: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    margin: 5, // Added margin
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
