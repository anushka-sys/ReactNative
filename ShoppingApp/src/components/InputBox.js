import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { fontsizes, spacing, Color } from '../styles/index.js';
import Icon from 'react-native-vector-icons/FontAwesome5';

const InputBox = () => {
  return (
    <View style={styles.inputContainer}>
        <Icon name="user-alt" size={20} color="#626262" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#626262"
        />
        
      </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputContainer: {
    top:100,
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: '#A8A8A9',
    borderRadius: 5,
    paddingHorizontal: 10, 
    height: 45,
    width:310,
    marginLeft: 25, 
    backgroundColor:'#e4e4e4',
  },
  icon: {
    marginRight: 10, 
  },
  input: {
    flex: 1, 
    height: '100%', 
    padding: 0, 
  },
})

