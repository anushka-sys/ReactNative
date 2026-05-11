import AppNavigator from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import ThemeProvider from './src/context/ThemeContext';
import CartProvider from './src/context/Context';
import WishlistProvider from './src/context/WishlistContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <PaperProvider>
            <AppNavigator />
          </PaperProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
