import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllExpenses from './screens/AllExpenses';
import OverbudgetExpenses from './screens/OverbudgetExpenses';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { database } from './firebase/FirebaseSetup';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconComponent;

          if (route.name === 'Home') {
            iconComponent = <FontAwesome name="home" size={24} color={color} />; 
          } else if (route.name === 'Overbudget') {
            iconComponent = <AntDesign name="exclamation" size={24} color={color} />; 
          }

          return iconComponent;
        },
        tabBarActiveTintColor: '#d69704',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor:"#8cdebf"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: "#8cdebf", 
        },
      })}
      // tabBarOptions={{
      //   activeTintColor: '#84d1b4',
      //   inactiveTintColor: 'gray',
      //   style: { backgroundColor: '#84d1b4' },
      // }}
    >
      <Tab.Screen name="Home" component={AllExpenses} />
      <Tab.Screen name="Overbudget" component={OverbudgetExpenses} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>aaaaa</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Mytabs" 
                    component={MyTabs} 
                    options={{ headerShown: false }} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2f7ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
