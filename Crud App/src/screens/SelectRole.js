import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Octicons';

const SelectRole = props => {
  const [selectedRoles, setSelectedRoles] = useState([]);

  const handlePress = role => {
    if (selectedRoles.includes(role)) {
      // remove role
      setSelectedRoles(selectedRoles.filter(item => item !== role));
    } else {
      // add role
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Admin */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={styles.Selectcontainer}
          onPress={() => handlePress('Admin')}
        >
          <Text style={styles.text}>Admin</Text>
          <Icon
            name={selectedRoles.includes('Admin') ? 'check-circle' : 'circle'}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Manager */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={styles.Selectcontainer}
          onPress={() => handlePress('Manager')}
        >
          <Text style={styles.text}>Manager</Text>
          <Icon
            name={selectedRoles.includes('Manager') ? 'check-circle' : 'circle'}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Employee */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={styles.Selectcontainer}
          onPress={() => handlePress('Employee')}
        >
          <Text style={styles.text}>Employee</Text>
          <Icon
            name={
              selectedRoles.includes('Employee') ? 'check-circle' : 'circle'
            }
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Staff */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={styles.Selectcontainer}
          onPress={() => handlePress('Staff')}
        >
          <Text style={styles.text}>Staff</Text>
          <Icon
            name={selectedRoles.includes('Staff') ? 'check-circle' : 'circle'}
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomView}>
        <View style={styles.bottombutton}>
          <TouchableOpacity onPress={() => setSelectedRoles([])}>
            <View style={styles.Cleartext}>
              <Text style={styles.buttonText}>Clear filter</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate({
                name: 'Filter',
                params: { selectedRoles },
                merge: true,
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
