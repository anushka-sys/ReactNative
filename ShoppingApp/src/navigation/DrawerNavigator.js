import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import CustomDrawer from './CustomDrawer';
import ChatbotScreen from '../screens/ChatbotScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
      }}
    >
      <Drawer.Screen name="MainApp" component={TabNavigator} />
      <Drawer.Screen name="Help" component={ChatbotScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
