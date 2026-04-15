import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const AppHeader = () => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.container}>

        
        <TouchableOpacity style={styles.leftBtn}>
          <Icon name="menu" size={24} color="#111" />
        </TouchableOpacity>

        
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.logo}
          />
        </View>

        
        <TouchableOpacity style={styles.rightBtn}>
          <Image
            source={require("../assets/profile.png")}
            style={styles.profile}
          />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({

  
  headerWrapper: {
    paddingTop: 15,
  },

  container: {
    height: 56,
    justifyContent: "center",
  },

  
  leftBtn: {
    position: "absolute",
    left: 16,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  
  rightBtn: {
    position: "absolute",
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 100,
    overflow: "hidden",
  },

  profile: {
    width: "100%",
    height: "100%",
  },

  
  logoWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 112,
    height: 31,
    resizeMode: "contain",
  },

});