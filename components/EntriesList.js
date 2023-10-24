import { StyleSheet, Text, View,  FlatList, } from 'react-native';
import React, { useEffect, useState } from 'react';
//import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from "../firebase/FirebaseSetup";
import { collection, onSnapshot } from "firebase/firestore";


const EntriesList = ({ type }) => {
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
            <FlatList
                data={entries}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                    <Text>{item.item}</Text>
                    <Text>{item.quantity} * {item.unitPrice}</Text>
                    </View>
                )}
            />
    );
  };
  
export default EntriesList;
  

const styles = StyleSheet.create({})