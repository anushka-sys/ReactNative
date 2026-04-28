import { StyleSheet, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  Avatar,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { ThemeContext } from '../context/ThemeContext';
import Icone from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

const CustomDrawer = props => {
  const navigation = useNavigation();
  const { isDark, toggleTheme ,theme} = useContext(ThemeContext);
  const styles = getStyles(theme);

  const handleLogout = async () =>{
    await AsyncStorage.setItem('IS_LOGGED_IN','false');
    navigation.dispatch(CommonActions.reset({
      index:0,
      routes:[{name:'Login'}]
    }))
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={styles.imagecontainer}>
              <Avatar.Image source={require('../assets/profile.png')} />
            </View>

            <View style={styles.txtcontainer}>
              <Text style={styles.title}>Anushka Wable</Text>
              <Text style={styles.id}>id@app</Text>
            </View>
          </View>

          {/* <Drawer.Section style={styles.drawerSection} > </Drawer.Section> */}
          <View>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home" color={theme.textSecondary} size={size} />
              )}
              label="Home"
              labelStyle={{color:theme.textSecondary}}
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="heart" color={theme.textSecondary} size={size} />
              )}
              label="Wishlist"
              labelStyle={{color:theme.textSecondary}}
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icone
                  name="chatbox-ellipses-outline"
                  color={theme.textSecondary}
                  size={size}
                />
              )}
              label="Help Center"
              labelStyle={{color:theme.textSecondary}}
              onPress={() => {}}
            />
          </View>
        </View>
        <Drawer.Section title="Prefrences">
          <TouchableRipple>
            <View style={styles.preference}>
              <Text style={{color:theme.textPrimary}}>Dark Theme</Text>

              <Switch value={isDark} onValueChange={toggleTheme}/>

            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>

      <View style={styles.divider} />
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="log-out" color={theme.textPrimary} size={size} />
          )}
          label="Sign Out"
          labelStyle={{color:theme.textPrimary}}
          onPress={handleLogout}
        ></DrawerItem>
      </Drawer.Section>
    </View>
  );
};

export default CustomDrawer;

const getStyles = (theme) => StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:theme.backgroundPrimary,
  },
  drawerContent: {
   flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color:theme.textPrimary,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color:theme.textSecondary,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    //paddingTop:10,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  imagecontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  id: {
    fontSize: 14,
    color: 'grey',
  },
  divider: {
    height: 1,
    marginHorizontal: 15,
    marginBottom: 5,
    borderTopColor: '#f4f4f4',
  },
});
