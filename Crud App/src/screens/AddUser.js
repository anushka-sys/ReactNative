import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {PutApi, PostApi} from '../services/ApiServices';

const AddUser = ({ navigation, route }) => {
  const user = route?.params?.user;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: '',
    phone: '',
  });

  const nameRegex = /^[A-Za-z ]{3,30}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{10}$/;

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [statusError, setStatuserror] = useState('');

  useEffect(() => {
    if (user) {
      setFormData(user); //prefill formdata
    }
  }, []);

  const roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Employee', value: 'Employee' },
  ];

  const statusList = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
  ];

  //saveUser
  const saveUser = async () => {
    let valid = true;

//form validation

    if (!nameRegex.test(formData.name)) {
      setNameError('Enter valid name');
      valid = false;
    } else {
      setNameError('');
    }

    if (!emailRegex.test(formData.email)) {
      setEmailError('Enter valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!phoneRegex.test(formData.phone)) {
      setPhoneError('Enter valid phone number');
      valid = false;
    } else {
      setPhoneError('');
    }

    if (!formData.role) {
      setRoleError('Please select a role');
      valid = false;
    } else {
      setRoleError('');
    }

    if (!formData.status) {
      setStatuserror('Please select status');
      valid = false;
    } else {
      setStatuserror('');
    }

    if (!valid) return;

    if (user) {
      await PutApi(user.id, formData); //if user exists then put
    } else {
      await PostApi(formData); //if new user post
    }
    navigation.goBack(); //userlist
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={saveUser}>
          <Text style={{ color: '#2196F3', fontSize: 16, marginRight: 10 }}>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, formData]);

  const handleInput = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />

        <TouchableOpacity style={styles.editPhoto}>
          <Text>Edit Photo</Text>
        </TouchableOpacity>
      </View>

      <Text>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={formData.name}
        onChangeText={text => handleInput('name', text)}
      />
      {nameError ? (
        <Text style={{ fontSize: 12, color: 'red' }}>Enter a valid name</Text>
      ) : null}

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={formData.email}
        onChangeText={text => handleInput('email', text)}
      />
      {emailError ? (
        <Text style={{ fontSize: 12, color: 'red' }}>Enter a valid email</Text>
      ) : null}

      <Text>Role</Text>
      <Dropdown
        style={styles.dropdown}
        data={roles}
        labelField="label"
        valueField="value"
        placeholder="Select role"
        value={formData.role}
        onChange={item => handleInput('role', item.value)}
      />
        {roleError ? (
        <Text style={{ fontSize: 12, color: 'red' }}>
          Select role
        </Text>
      ) : null}

      <Text>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Phone"
        value={formData.phone}
        onChangeText={text => handleInput('phone', text)}
      />
      {phoneError ? (
        <Text style={{ fontSize: 12, color: 'red' }}>
          Enter a valid phone number
        </Text>
      ) : null}

      <Text>Status</Text>
      <Dropdown
        style={styles.dropdown}
        data={statusList}
        labelField="label"
        valueField="value"
        placeholder="Select status"
        value={formData.status}
        onChange={item => handleInput('status', item.value)}
      />
      {statusError ? (
        <Text style={{ fontSize: 12, color: 'red' }}>
          Select Status
        </Text>
      ) : null}

      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete User</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f6f8',
  },

  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },

  editPhoto: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    borderRadius: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    //marginBottom: 15,
    borderRadius: 5,
    marginBottom: 0,
  },

  deleteButton: {
    backgroundColor: 'red',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },

  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  label: {
    fontSize: 15,
    color: '#333',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    width: 150,
    height: 40,
    justifyContent: 'center',
  },

  picker: {
    height: 50,
    width: '100%',
    fontSize: 2,
  },
  dropdown: {
    width: 150,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});
