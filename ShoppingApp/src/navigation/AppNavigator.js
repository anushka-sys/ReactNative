import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignUp from '../screens/SignUp';
import ForgetPassword from '../screens/ForgetPassword';
import GetStartedScreen from '../screens/GetStartedScreen';
import TabNavigator from './TabNavigator';
import ProductDetails from '../screens/ProductDetails';

// Import CartProvider — wraps entire app so cart is accessible everywhere
import { CartProvider } from '../context/CartContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    // CartProvider wraps NavigationContainer so all screens can use useCart()
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          {/* ProductDetails screen — receives product via route.params */}
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default AppNavigator;
