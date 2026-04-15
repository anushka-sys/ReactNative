import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { fontsizes, spacing, Color, layout } from '../styles/index.js';
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
    flexDirection: 'row',
    alignItems: 'center',
    width: layout.inputWidth,
    backgroundColor: Color.backgroundMuted,
    borderRadius:10,      
    borderWidth: 1,                    
    borderColor: Color.border,
  }, 
  icon: { 
    paddingLeft: spacing.paymentPadding,
    paddingRight: spacing.inputPaddingH,
    paddingVertical: spacing.screenPaddingTop,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.screenPaddingTop,
    paddingRight: spacing.paymentPadding,
    fontSize: fontsizes.inputText,     
    color: Color.textPlaceholder,
  },
});