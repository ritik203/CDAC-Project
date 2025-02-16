import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { UserProvider, useUser } from './src/services/UserContext';

import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';
import CheckoutScreen from './src/screens/Checkout';
import ThankYouPage from './src/screens/Thanks';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import SearchBookScreen from './src/screens/SearchBook';
import SeatMapScreen from './src/screens/SeatMapScreen';
import TicketScreen from './src/screens/Ticket';
import TheatreShowsScreen from './src/screens/TheatreShowScreens';
import BookingsScreen from './src/screens/Bookings';
import CitySelection from './src/screens/CitySelection';
import { CityProvider } from './src/services/CityContext';
import PaymentScreen from './src/screens/Payment';
import ProfileScreen from './src/screens/Profile';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
  const { user, logout, } = useUser(); 
  

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#3c99ff' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => <Ionicons name="home" size={22} color={color} />,
          
        }}
      />
      
      <Drawer.Screen 
        name="Bookings" 
        component={BookingsScreen} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="list" size={22} color={color} />,
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="list" size={22} color={color} />,
        }}
      />
      <Drawer.Screen 
        name="Logout"
        component={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="log-out" size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}


export default function App() {
  return (
    <Provider store={store}>
    <UserProvider>
    <CityProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{
              title: 'Register',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
            />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{
              title: 'Login',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
            />
          <Stack.Screen 
            name="Home" 
            component={DrawerNavigator} 
            options={{ headerShown: false }} 
            />
          <Stack.Screen name="CitySelection" component={CitySelection} />
          <Stack.Screen 
            name="Details" 
            component={DetailsScreen} 
            options={{
              title: 'Movie Details',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
            />
          <Stack.Screen 
            name="TheatreShows" 
            component={TheatreShowsScreen} 
            options={{
              title: 'Theatre Show',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
            />
          <Stack.Screen 
            name="SeatMap" 
            component={SeatMapScreen} 
            options={{
              title: 'Book Ticket',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
            />
            <Stack.Screen 
            name="Payment" 
            component={PaymentScreen} 
            options={{
              title: 'Payment',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
            />
          <Stack.Screen 
            name="Ticket" 
            component={TicketScreen} 
            options={{
              title: 'Ticket',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
          />
          <Stack.Screen 
            name="Checkout" 
            component={CheckoutScreen} 
            options={{
              title: 'Checkout',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
          />
          <Stack.Screen 
            name="SearchBook" 
            component={SearchBookScreen} 
            options={{
              title: 'SearchBook',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
            />
          <Stack.Screen 
            name="ThankYou" 
            component={ThankYouPage} 
            options={{
              title: 'ThankYou',
              headerStyle: { backgroundColor: '#3c99ff' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CityProvider>
    </UserProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  cartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 20,
    backgroundColor: '#e74c3c',
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
