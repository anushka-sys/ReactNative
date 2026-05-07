import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import HomePage from '../screens/HomePage';
import CartScreen from '../screens/CartScreen';
import WishlistScreen from '../screens/WishlistScreen';
import { CartContext } from '../context/Context';
import { WishlistContext } from '../context/WishlistContext';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { cartItems } = useContext(CartContext);
  const { theme, isDark } = useContext(ThemeContext);
  const {wishlistCount,clearAll} = useContext(WishlistContext)

  const getTabBarIcon = (routeName, focused, color, size) => {
    let iconName;

    if (routeName === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (routeName === 'Cart') {
      iconName = focused ? 'cart' : 'cart-outline';
    } else if (routeName === 'WishList') {
      iconName = focused ? 'heart' : 'heart-outline';
    }

    return <Icon name={iconName || 'help-circle'} size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),

        tabBarActiveTintColor: '#F83758',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          paddingBottom: 8,
          height: 60,
          //paddingTop:5,
          backgroundColor: theme.backgroundPrimary,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        // Change your Cart screen options to:
        options={{
          tabBarBadge: cartItems?.length > 0 ? cartItems.length : null,
        }}
      />
      <Tab.Screen
       name="WishList"
        component={WishlistScreen} 
        options={({navigation})=> ({
          headerShown:true,
          title:'My Wishlist',
          tabBarBadge:wishlistCount > 0? wishlistCount : null,
          headerRight: () => 
            wishlistCount > 0 ? (
              <TouchableOpacity onPress={clearAll} style={{marginRight:16}}>
                <Text>Clear List</Text>
              </TouchableOpacity>
            ) : null,
        })}
        />
    </Tab.Navigator>
  );
};

export default TabNavigator;
