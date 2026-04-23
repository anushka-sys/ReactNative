import React,{useContext} from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fontSizes, layout,spacing } from '../styles';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from "../context/ThemeContext";

const AppHeader = () => {
  const Navigation = useNavigation();
  const { theme} = useContext(ThemeContext);
    const styles = getStyles(theme);

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.container}>
        
        <TouchableOpacity style={styles.leftBtn}onPress={()=>Navigation.openDrawer()}>
          <Icon name="menu" size={24} style={styles.icone} />
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

const getStyles = (theme) => StyleSheet.create({
  
  headerWrapper: {
    paddingTop: spacing.couponGap,
  },

  container: {
    height: spacing.loginp,
    justifyContent: "center",
  },
  
  leftBtn: {
    position: "absolute",
    left: spacing['4xl'],
    width: spacing.apph,
    height: spacing.apph,
    justifyContent: "center",
    alignItems: "center",
  },
  
  rightBtn: {
    position: "absolute",
    right: spacing['4xl'],
    width: spacing.apph,
    height: spacing.apph,
    //borderRadius: 100,
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
    width: layout.header,
    height: spacing.gapb,
    resizeMode: "contain",
  },
  icone:{
    color: theme.textPrimary,
  }

});