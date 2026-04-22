import { StyleSheet, View } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
  Avatar,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
//import Icone from 'react-native-vector-icons/Ionicons';

const CustomDrawer = props => {
  return (
    <View style={{ flex: 1 }}>
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
          <Drawer.Section style={styles.drawerSection}> </Drawer.Section>
          <View>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {}}
            />
             <DrawerItem
              icon={({ color, size }) => (
                <Icon name="heart" color={color} size={size} />
              )}
              label="Wishlist"
              onPress={() => {}}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="chatbox-ellipses-outline" color={color} size={size} />
              )}
              label="Help Center"
              onPress={() => {}}
            />
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="log-out" color={color} size={size} />
          )}
          label="Sign Out"
        ></DrawerItem>
      </Drawer.Section>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
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
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
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
});
