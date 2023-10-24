import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EntriesList from '../components/EntriesList';

// const OverbudgetExpenses = ({navigation}) => {
//   return (
//     <View>
//       <Text>OverbudgetExpenses</Text>
//     </View>
//   )
// }

const OverbudgetExpenses = () => {
  return (
    <EntriesList type="overbudget" />
  );
};


export default OverbudgetExpenses

const styles = StyleSheet.create({})