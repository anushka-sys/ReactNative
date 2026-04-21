import React,{useContext} from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {ThemeContext} from '../context/ThemeContext';

const SearchBar = ({ value, onChangeText }) => {
      const { theme } = useContext(ThemeContext);
    
       const styles = getStyles(theme);

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        
        <Icon name="search" size={20} color="#9CA3AF" />

        <TextInput
          placeholder="Search any Product.."
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />

        <TouchableOpacity>
          <Icon name="mic" size={20} color="#9CA3AF" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default SearchBar;

const getStyles = (theme) => StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop:16,
  },

  container: {
    height: 40,
    backgroundColor: theme.backgroundPrimary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    lineHeight: 20,
    color: "#000",
    padding: 0, 
  },
});