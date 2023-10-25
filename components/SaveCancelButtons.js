import React from 'react';
import { View, Text,StyleSheet, } from 'react-native';
import PressableButton from './PressableButton';

const SaveCancelButtons = ({ onCancel, onSave }) => {
  return (
    <View style={styles.buttonContainer}>
      <PressableButton
        pressedFunction={onCancel}
        pressedStyle={styles.buttonPressed}
        defaultStyle={styles.buttonDefault}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </PressableButton>
      <PressableButton
        pressedFunction={onSave}
        pressedStyle={styles.buttonPressed}
        defaultStyle={styles.buttonDefault}
      >
        <Text style={styles.buttonText}>Save</Text>
      </PressableButton>
    </View>
  );
};

export default SaveCancelButtons;

const styles = StyleSheet.create({
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginHorizontal: 20,
        marginTop:'55%',
      },
      buttonDefault: {
        backgroundColor: '#71ada8',
        opacity: 1,
        borderRadius: 4,
        padding: 5,
        width:'35%',
        justifyContent: 'center',
      },
      buttonPressed: {
        backgroundColor: '#aaa',
        opacity: 0.5,
        borderRadius: 4,
        padding: 5,
        width:'35%',
        justifyContent: 'center',
      },
      buttonText: {
        color: 'white', 
        fontSize: 17,
      },
})