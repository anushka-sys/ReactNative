import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUp from '../screens/SignUp';
import ForgetPassword from '../screens/ForgetPassword';
import GetStartedScreen from '../screens/GetStartedScreen';
import TabNavigator from './TabNavigator';
import ProductDetails from '../screens/ProductDetails';
import ProfileScreen from '../screens/ProfileScreen';
import DrawerNavigator from './DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialroute] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('IS_LOGGED_IN').then(val => {
      setInitialroute(val === 'true' ? 'MainTabs' : 'Login');
    });
  }, []);
  if (!initialRoute) return null;
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />

        <Stack.Screen name="MainTabs" component={DrawerNavigator} />

        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
