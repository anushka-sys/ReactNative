import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const SearchBar = ({ value, onChangeText }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Icon name="search" size={18} color="#BBBBBB" />

        <TextInput
          placeholder="Search any Product.."  //change text
          placeholderTextColor="#BBBBBB"
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />

        <Icon name="mic" size={16} color="#BBBBBB" />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 10,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 13,
    marginLeft: 8,
    color: "#000",
  },
});