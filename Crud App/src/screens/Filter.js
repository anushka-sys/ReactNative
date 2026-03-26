import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';

const Filter = props => {
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const roles = props.route?.params?.selectedRoles || [];

  return (
    <View style={styles.filterContainer}>
      <Text style={styles.title}>Grade</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.Selectcontainer}
          onPress={() => props.navigation.navigate('Select Role')}
        >
         <Text style={styles.text}>{selectedStatus ? selectedStatus + ' >' : 'Select >'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Status</Text>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.Selectcontainer}
          onPress={() => setStatusModalVisible(true)}
        >
          <Text style={styles.text}>Select</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomView}>
        <View style={styles.bottombutton}>
          <TouchableOpacity>
            <View style={styles.Cleartext}>
              <Text style={styles.buttonText}>Clear</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('All Users', {
                selectedRoles: roles,
                selectedStatus: selectedStatus,
              });
            }}
          >
            <View style={styles.ApplyText}>
              <Text style={styles.Apply}>Apply</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={statusModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setStatusModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {/* Bottom Sheet */}
          <View style={styles.bottomSheet}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setStatusModalVisible(false)}
            >
              <Text style={{ fontSize: 18 }}>✕</Text>
            </TouchableOpacity>

            {/* Options */}
            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => {
                setSelectedStatus('Active');
                setStatusModalVisible(false);
              }}
            >
              <Text style={styles.optionText}>Active</Text>
              <View style={styles.radioCircle} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionRow}
              onPress={() => {
                setSelectedStatus('Inactive');
                setStatusModalVisible(false);
              }}
            >
              <Text style={styles.optionText}>Inactive</Text>
              <View style={styles.radioCircle} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
  },
  Selectcontainer: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    backgroundColor: '#4f7eed',
    borderColor: '#4f7eed',
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
  },
  text: {
    color: 'white',
    padding: 2,
    fontWeight: 'bold',
  },
  title: {
    paddingLeft: 25,
    paddingTop: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },

  bottomSheet: {
    backgroundColor: '#536dfe',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  closeButton: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },

  optionText: {
    color: 'white',
    fontSize: 16,
  },

  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  bottomView: {
    //flex: 1,
    width: '100%',
    height: 70,
    backgroundColor: '#536dfe',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  bottombutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  Cleartext: {
    borderRadius: 50,
    borderWidth: 1.5,
    height: 40,
    width: 140,
    justifyContent: 'center', // Vertical center
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
    justifyContent: 'center', // Vertical center
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'grey',
  },
  Apply: {
    fontWeight: 'bold',
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
});

/*
  Cleartext: {
    borderRadius: 50,
    borderWidth: 1.5,
    height: 40,
    width: 70,
    // These two center the Text component inside the View
    justifyContent: 'center', 
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center', // Centers text inside the <Text> tag
    textAlignVertical: 'center', // Specific to Android
    // include fontSize or fontWeight here
  }
 */
