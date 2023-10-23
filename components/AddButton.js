import { StyleSheet, Pressable, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const AddButton = ({ onPress, icon, size, color }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.buttonPressed}
    >
      <View style={styles.container}>
        <Ionicons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  )
}

export default AddButton

const styles = StyleSheet.create({
    container: {
        borderRadius: 22,
        padding: 6,
        marginHorizontal: 8,
        fontWeight: "bold",
      },
      buttonPressed: {
        opacity: 0.7,
      },
})