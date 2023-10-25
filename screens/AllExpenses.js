import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EntriesList from '../components/EntriesList'
import colors from '../colors'

const AllExpenses = ({navigation}) => {
  return (
    <View style={styles.container}>
      <EntriesList type="all" navigation={navigation} />
    </View>
  )
}

export default AllExpenses

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tealLight,
  },
})