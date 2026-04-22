import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
// import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      // drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
      }}
    >
      <Drawer.Screen name="Home" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;


// console.js:668 Found screens with the same name nested inside one another. Check:

// MainTabs > Home, MainTabs > Home > Home

// This can cause confusing behavior during navigation. Consider using unique names for each screen instead.
