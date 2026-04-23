import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';

const ModalPopup = ({ visible, children, onClose }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.close}>
              <Icon name="x" size={20} color={'#000'} />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const ProfileScreen = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ModalPopup visible={visible} onClose={() => setVisible(false)}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/circle.png')}
            style={styles.image}
          />
          <Image
            source={require('../assets/tick.png')}
            style={styles.tick}
          />
        </View>
      </ModalPopup>

      <Button title="Open Modal" onPress={() => setVisible(true)} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
   // width: '100%',
    height: 40,
    alignItems: 'flex-end',
    //justifyContent: 'center',
  },
  image:{
    height:100,
    width:100,
  },
  close:{
    paddingTop:-20,
  },
  tick:{
    paddingBottom:10,
    //color:'black'
    borderWidth:1,
    borderColor:'black'
  }
});