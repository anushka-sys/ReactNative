
import AppNavigator from './src/navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import  ThemeProvider  from './src/context/ThemeContext'
import  CartProvider  from './src/context/Context';

const App = () => {
  return (
    <ThemeProvider>
    <CartProvider>
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
    </CartProvider>
    </ThemeProvider>
  );
};

export default App;