import { View, Text, TextInput, Button, Alert, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { writeToDB } from '../firebase/FirebaseHelper';
import colors from '../colors';
import PressableButton from '../components/PressableButton';

const AddAnExpense = ({ navigation }) => {
    const [item, setItem] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [quantity, setQuantity] = useState('0'); // Default to 0
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [quantities, setQuantities] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']); // Dropdown options

    const saveExpense = async () => {
        if (!item || !unitPrice || !quantity || quantity == 0) {
            Alert.alert('Invalid Data', 'Please fill in all fields');
            return;
          }
      
          if (isNaN(unitPrice) || isNaN(quantity) || unitPrice < 0 || quantity < 0) {
            Alert.alert('Invalid Data', 'Please enter valid numeric values for unit price');
            return;
          }
      
          const newExpenseEntry = {
            item,
            unitPrice: parseInt(unitPrice), 
            quantity: parseInt(quantity),
          };
        try {
            writeToDB(newExpenseEntry);
          } catch (error) {
            console.log("error message");
          }
          navigation.goBack();
      };

    const handleCancel = () => {
    navigation.goBack();
    };
    

  return (
    <View style={styles.container}>
        <View style={styles.formContainer}>
            <View style={styles.formField}>
                <Text style={styles.labelText}>Item *</Text>
                <TextInput
                style={styles.inputField}
                onChangeText={(text) => setItem(text)}
                />
            </View>
            <View style={styles.formField}>
                <Text style={styles.labelText}>Unit Price *</Text>
                <TextInput
                style={styles.inputField}
                onChangeText={(text) => setUnitPrice(text)}
                keyboardType="numeric"
                />
            </View>
            <View style={styles.formField}>
                <Text style={styles.labelText}>Quantity *</Text>
                <DropDownPicker
                placeholder=''
                open={open}
                value={value}
                items={quantities.map((val) => ({ label: val, value: val }))}
                setOpen={setOpen}
                setValue={(val) => {
                    setValue(val);
                    setQuantity(val);
                }}
                style={styles.inputField}
                />
            </View>
        </View>
        <View style={styles.buttonContainer}>
            <PressableButton
                pressedFunction={handleCancel}
                pressedStyle={styles.buttonPressed}
                defaultStyle={styles.buttonDefault}
            >
                <Text style={styles.buttonText}>Cancel</Text>
            </PressableButton>
            <PressableButton
                pressedFunction={saveExpense}
                pressedStyle={styles.buttonPressed}
                defaultStyle={styles.buttonDefault}
            >
                <Text style={styles.buttonText}>Save</Text>
            </PressableButton>
        </View>

    </View>
  )
}

export default AddAnExpense

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: colors.tealLight,
      },
      formContainer:{
        marginTop: 50,
      },
      formField: {
        marginBottom: 20,
        marginHorizontal: 25,
      },
      inputField: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        backgroundColor:colors.inputbackground,
        color: colors.tealText, 
        fontSize: 16,
      },
      labelText: {
        fontSize: 16,
        color: colors.tealText,
        fontWeight:"bold",
      },
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