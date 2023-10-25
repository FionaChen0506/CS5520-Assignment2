import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EntriesList from '../components/EntriesList';
import colors from '../colors';

// const OverbudgetExpenses = ({navigation}) => {
//   return (
//     <View>
//       <Text>OverbudgetExpenses</Text>
//     </View>
//   )
// }

const OverbudgetExpenses = ({navigation}) => {
  return (
    <View style={styles.container}>
      <EntriesList type="overbudget" navigation={navigation}/>
    </View>
  );
};


export default OverbudgetExpenses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tealLight,
  },
})