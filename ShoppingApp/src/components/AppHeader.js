import React from "react";
import { View, Image, StyleSheet } from "react-native";

const AppHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/lines.png")}
        style={styles.icon}
      />

      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
      />

      <Image
        source={require("../assets/profile.png")}
        style={styles.icon}
      />
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  logo: {
    width: 110,
    height: 30,
    resizeMode: "contain",
  },
});