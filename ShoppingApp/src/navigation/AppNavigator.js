import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  CartProvider  from '../context/Context';
import LoginScreen from '../screens/LoginScreen';
import SignUp from '../screens/SignUp';
import ForgetPassword from '../screens/ForgetPassword';
import GetStartedScreen from '../screens/GetStartedScreen';
import TabNavigator from './TabNavigator';
import ProductDetails from '../screens/ProductDetails'

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
        
        <Stack.Screen name="MainTabs" component={TabNavigator} />

        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
};

export default AppNavigator;