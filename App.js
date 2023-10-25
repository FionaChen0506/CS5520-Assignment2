import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AllExpenses from './screens/AllExpenses';
import AddAnExpense from './screens/AddAnExpense';
import OverbudgetExpenses from './screens/OverbudgetExpenses';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AddButton from './components/AddButton';
import colors from './colors';
import EntriesList from './components/EntriesList';
import Edit from './screens/Edit';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarIcon: ({ color, size }) => {
          let iconComponent;

          if (route.name === 'Home') {
            iconComponent = <FontAwesome name="home" size={24} color={color} />; 
          } else if (route.name === 'Overbudget') {
            iconComponent = <AntDesign name="exclamation" size={24} color={color} />; 
          }

          return iconComponent;
        },
        tabBarActiveTintColor: colors.yellow,
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor:colors.teal,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          backgroundColor: colors.teal, 
        },
        headerRight: () => (
          <AddButton
            icon="add"
            size={28}
            color={"white"}
            onPress={() => {
              navigation.navigate("Add An Expense");
            }}
          />
        ),
      })}
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
      
      <Stack.Screen name="Add An Expense" 
                    component={AddAnExpense}
                    options={{
                      headerStyle: {
                        backgroundColor:colors.teal,
                      },
                      headerTintColor: 'white',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                      },
                    }} />
      <Stack.Screen name="EntriesList" component={EntriesList} />
      <Stack.Screen name="Edit"
                    component={Edit}
                    options={{
                      headerStyle: {
                        backgroundColor:colors.teal,
                      },
                      headerTintColor: 'white',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                      },
                    }}
      />
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
