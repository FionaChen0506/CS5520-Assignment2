import { StyleSheet, Text, View,  FlatList,TouchableOpacity, } from 'react-native';
import React, { useEffect, useState } from 'react';
//import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from "../firebase/FirebaseSetup";
import { collection, onSnapshot } from "firebase/firestore";
import { Entypo } from '@expo/vector-icons';
import Edit from '../screens/Edit';
import { NavigationContainer } from '@react-navigation/native';
import colors from '../colors';
import { Ionicons } from '@expo/vector-icons';


const EntriesList = ({ type, navigation }) => {
    const [entries, setEntries] = useState([]);
  
    useEffect(() => {
        const query = collection(database, 'Expenses');
    
        const unsubscribe = onSnapshot(query, (snapshot) => {
          const entriesArray = [];
          snapshot.docs.forEach((docSnap) => {
            const entryData = { ...docSnap.data(), id: docSnap.id };
            if (type === 'overbudget' && entryData.overbudget === false) {
              // Skip non-overbudget entries
              return;
            }
            entriesArray.push(entryData);
          });
          setEntries(entriesArray);
        });
        return () => {
            unsubscribe();
          };
        }, [type]);
  
    // Render the entries 
    return (
        <View style={styles.container}>
            <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Edit', { entryId: item.id })}
              >
                <View style={styles.entryContainer} >
                  <Text style={styles.itemText}>{item.item}</Text>
                  <View style={styles.infoContainer}>
                    {item.overbudget && (
                        <Ionicons name="warning" size={24} color='yellow' />
                    )}
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceText}>
                        {item.quantity} * {item.unitPrice}
                        </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
    );
  };
  
export default EntriesList;
  

const styles = StyleSheet.create({
    container:{
        marginTop: 25,
    },
    entryContainer: {
        backgroundColor: colors.teal, 
        padding: 10,
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical:8,
        marginHorizontal:'5%',
        borderRadius: 8,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 1 }, // Shadow offset
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 3, // Shadow radius
        elevation: 4, // Android shadow elevation
      },

      itemText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
      },

      infoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'center',
        marginVertical:1,
      },

    priceContainer: {
        backgroundColor: 'white',
        width: 80, 
        padding: 5, 
        borderRadius: 2, 
        marginLeft: 5,
        alignItems: 'center',
    },

      priceText:{
        marginLeft: 3,
        //backgroundColor: 'white',
        color: colors.tealText,
        fontWeight: 'bold',
        fontSize:16,
      },

})