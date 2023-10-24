import { StyleSheet, Text, View,  FlatList, } from 'react-native';
import React, { useEffect, useState } from 'react';
//import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from "../firebase/FirebaseSetup";
import { collection, onSnapshot } from "firebase/firestore";


const EntriesList = () => {
  return (
    <View>
      <Text>EntriesList</Text>
    </View>
  )
}

export default EntriesList

const styles = StyleSheet.create({})