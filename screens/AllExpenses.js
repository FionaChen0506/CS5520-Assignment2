import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import EntriesList from '../components/EntriesList'

const AllExpenses = () => {
  return (
    <View >
      <EntriesList type="all" />
    </View>
  )
}

export default AllExpenses

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d2f7ea',
  },
})