
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserList from './src/screens/UserList'
import AddUser from './src/screens/AddUser'
import Filter from './src/screens/Filter'
import SelectRole from './src/screens/SelectRole'
import NoData from './src/screens/NoData'

const Stack = createNativeStackNavigator();
function App() {

  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='All Users' component={UserList}/>
      <Stack.Screen name='Add Users' component={AddUser}/>
      <Stack.Screen name='Filter' component={Filter}/>
      <Stack.Screen name='Select Role' component={SelectRole}/>
      <Stack.Screen name='No Data' component={NoData}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;
