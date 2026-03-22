import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Octicons';

const SelectRole = props => {
  const [selectedRoles, setSelectedRoles] = useState({
    Admin: false,
    Manager: false,
    Employee: false,
    Staff: false,
  });

  const roles = ['Admin', 'Manager', 'Employee', 'Staff'];

  const toggleRole = role => {
    setSelectedRoles({
      ...selectedRoles,
      [role]: !selectedRoles[role],
    });
  };

  const getSelectedRoles = () => {
    return Object.keys(selectedRoles).filter(key => selectedRoles[key]);
  };

  return (
    <View style={styles.container}>
      {roles.map((item, index) => (
        <View key={index} style={styles.roleContainer}>
          <TouchableOpacity
            style={styles.Selectcontainer}
            onPress={() => toggleRole(item)}
          >
            <Text style={styles.text}>{item}</Text>

            <Icon
              name={selectedRoles[item] ? 'check-circle' : 'circle'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      ))}

      {/* Bottom Buttons */}
      <View style={styles.bottomView}>
        <View style={styles.bottombutton}>
          <TouchableOpacity
            onPress={() =>
              setSelectedRoles({
                Admin: false,
                Manager: false,
                Employee: false,
                Staff: false,
              })
            }
          >
            <View style={styles.Cleartext}>
              <Text style={styles.buttonText}>Clear filter</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const data = getSelectedRoles();
              console.log('Sending Roles:', data);

              props.navigation.navigate('Filter', {
                selectedRoles: data,
              });
            }}
          >
            <View style={styles.ApplyText}>
              <Text style={styles.Apply}>Confirm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SelectRole;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  roleContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#4f7eed',
    width: '85%',
    marginTop: 20,
    height: 40,
    backgroundColor: '#4f7eed',
    justifyContent: 'center',
  },

  Selectcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  text: {
    color: 'white',
    fontWeight: 'bold',
  },

  bottomView: {
    width: '100%',
    height: 70,
    backgroundColor: '#536dfe',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },

  bottombutton: {
    flexDirection: 'row',
    gap: 40,
  },

  Cleartext: {
    borderRadius: 50,
    borderWidth: 1.5,
    height: 40,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
  },

  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },

  ApplyText: {
    borderRadius: 50,
    borderWidth: 1.5,
    height: 40,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'grey',
  },

  Apply: {
    fontWeight: 'bold',
    color: 'white',
  },
});
