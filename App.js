import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllExpenses from './screens/AllExpenses';
import OverbudgetExpenses from './screens/OverbudgetExpenses';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
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
    }}
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
