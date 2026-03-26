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
import NoData from './NoData';

const UserList = props => {
  const [users, setUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [id, setId] = useState();
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const roles = props.route?.params?.selectedRoles || [];
  const status = props.route?.params?.selectedStatus || null;

  const finalData = users.filter(user => {
    console.log('rples array:', roles);
    console.log('roles:', JSON.stringify(roles));
    console.log('first user role:', JSON.stringify(users[0]?.role));
    return (
      // search name
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      // roles
      (roles.length === 0 || roles.includes(user.role)) &&
      // status
      (!status ||
        (status === 'Active' ? user.status === true : user.status === false))
    );
  });

  useEffect(() => {
    loadUsers();
  }, [props.route?.params?.selectedRoles, props.route?.params?.selectedStatus]);

  const loadUsers = async () => {
    const data = await GetApi();
    console.log('FIRST USER:', JSON.stringify(data[0]));
    // console.log('All roles:',data.map(user=> user.role))
    setUsers(data);
    setLoading(false);
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

  const handleSearch = text => {
    setSearchQuery(text);
  };

  console.log('finalData length', finalData.length);
  console.log('user length', users.length);
  console.log('unique length', [...new Set(users.map(u => u.role))]);

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

        {loading ? (
          <Text style={{ textAlign: 'center', marginTop: 40 }}>Loading...</Text>
        ) : finalData.length === 0 ? (
          <NoData
            onClear={() =>
              props.navigation.navigate('All Users', {
                selectedRoles: [],
                selectedStatus: null,
              })
            }
          />
        ) : (
          <FlatList
            data={finalData}
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
                    onPress={() => handleDelete(item.id)}
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
        )}
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



// [
//   {
//     email: 'jay@gmailcom',
//     name: 'Jay',
//     avatar: 'https://avatars.githubusercontent.com/u/20068312',
//     phone: 1234567890,
//     status: true,
//     role: 'Employee',
//     id: '2',
//   },
//   {
//     email: 'rohit@gmailcom',
//     name: 'Rohit Sharma',
//     avatar: 'https://avatars.githubusercontent.com/u/10650461',
//     phone: 1234567890,
//     status: true,
//     role: 'Employee',
//     id: '4',
//   },
//   {
//     email: 'varun@gmailcom',
//     name: 'Varun Das',
//     avatar:
//       'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/female/512/2.jpg',
//     phone: 1234567890,
//     status: false,
//     role: 'Employee',
//     id: '5',
//   },
//   {
//     email: 'shre@gmail.com',
//     name: 'Shreya',
//     avatar:
//       'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/53.jpg',
//     phone: '1234567890',
//     status: 'active',
//     role: 'Admin',
//     id: '8',
//   },
//   {
//     email: 'reena@gmail.com',
//     name: 'Reena',
//     avatar:
//       'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/4.jpg',
//     phone: '1234567890',
//     status: 'inactive',
//     role: 'Admin',
//     id: '10',
//   },
//   {
//     email: 'anusghka@xyzl.com',
//     name: 'anushka',
//     avatar: 'https://avatars.githubusercontent.com/u/91465225',
//     phone: '9356847532',
//     status: 'active',
//     role: 'Admin',
//     id: '11',
//   },
//   {
//     email: 'shoan@email.com',
//     name: 'Shoan',
//     avatar: 'https://avatars.githubusercontent.com/u/63366228',
//     phone: '1234567890',
//     status: 'inactive',
//     role: 'Admin',
//     id: '12',
//   },
//   {
//     email: 'anuhska@gmail.com',
//     name: 'Anushka',
//     avatar:
//       'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/26.jpg',
//     phone: '1234567890',
//     status: 'active',
//     role: 'Manager',
//     id: '13',
//   },
//   {
//     email: 'raj@gmail.com',
//     name: 'Raj',
//     avatar:
//       'https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/60.jpg',
//     phone: '1234567890',
//     status: 'active',
//     role: 'Manager',
//     id: '14',
//   },
// ];

/*
rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:114 finalData length 9
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:115 user length 9
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:116 unique length Array(3)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:62 FIRST USER: {"email":"jay@gmailcom","name":"Jay","avatar":"https://avatars.githubusercontent.com/u/20068312","phone":1234567890,"status":true,"role":"Employee","id":"2"}
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: []
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:114 finalData length 9
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:115 user length 9
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:116 unique length Array(3)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:114 finalData length 0
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:115 user length 0
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:116 unique length Array(0)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:62 FIRST USER: {"email":"jay@gmailcom","name":"Jay","avatar":"https://avatars.githubusercontent.com/u/20068312","phone":1234567890,"status":true,"role":"Employee","id":"2"}
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(2)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: ["Admin","Employee"]
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(2)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: ["Admin","Employee"]
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(2)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: ["Admin","Employee"]
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(2)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: ["Admin","Employee"]
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(2)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: ["Admin","Employee"]
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(2)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: ["Admin","Employee"]
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(2)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: ["Admin","Employee"]
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(2)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: ["Admin","Employee"]
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:44 rples array: Array(2)
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:45 roles: ["Admin","Employee"]
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:46 first user role: "Employee"
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:114 finalData length 1
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:115 user length 9
&platform=android&dev=true&lazy=true&minify=false&app=com.myapp&modulesOnly=true&runModule=true&sourcePaths=url-server&shallow=true:116 unique length Array(3)
Welcome to React Native DevTools
Debugger integration: Andro
 */