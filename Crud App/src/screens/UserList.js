import { useEffect, useState, useLayoutEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchIcon from '../components/SearchIcon';
import { GetApi, DeleteApi } from '../services/ApiServices';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserList = props => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [id, setId] = useState();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    loadUsers();
    // setUserList(data);
    // setFilteredList(data);
  }, []);

  const loadUsers = async () => {
  const data = await GetApi();
  setUsers(data);
  setFilteredUsers(data); 
}; 

  //Refresh
  const onRefresh = () => {
    setRefreshing(true);
    loadUsers();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  //Delete user
  const handleDelete = async id => {
    const result = await DeleteApi(id);
    loadUsers();
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => setSearchVisible(prev => !prev)}>
            <SearchIcon size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Filter')}>
            <Icon name="filter-alt" size={25} color="grey" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [props.navigation]);

const handleSearch = (text) => {
  setSearchQuery(text);

  const filtered = users.filter((item) =>
    item.name.toLowerCase().includes(text.toLowerCase())
  );

  setFilteredUsers(filtered);
};

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <View style={styles.page}>
        {isSearchVisible && (
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search users"
              style={styles.searchInput}
              placeholderTextColor="#888"
              onChangeText={handleSearch}
            />

            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSearchVisible(false);
              }}
            >
              <Text>x</Text>
            </TouchableOpacity>
          </View>
        )}

        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />

              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>

              <View style={styles.formbutton}>
                <TouchableOpacity
                  style={styles.delete}
                  onPress={() => handleDelete(item.id, { mode: 'Delete' })}
                >
                  <Text style={styles.deltext}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.update}
                  onPress={() =>
                    props.navigation.navigate('Add Users', { user: item })
                  }
                >
                  <Text style={styles.uptext}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* <View>
       
        <Button title='go to adduser' onPress={()=>props.navigation.navigate("Add Users")} />
    </View> */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => props.navigation.navigate('Add Users')}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: 14,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  role: {
    color: '#757474',
    fontSize: 13,
    fontWeight: 'bold',
  },

  email: {
    color: '#666',
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  plus: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  page: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f5f6f8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    height: 38,
    marginTop: 4,
    marginBottom: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  deltext: {
    fontSize: 12,
    color: 'red',
    padding: 5,
  },
  formbutton: {
    flexDirection: 'column',
  },
  uptext: {
    fontSize: 11,
    color: 'blue',
    padding: 5,
  },
  icons: {
    flexDirection: 'row',
    padding: 5,
    gap: 10,
  },
});
