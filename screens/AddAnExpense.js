import { View, Text, TextInput, Button, Alert, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { writeToDB } from '../firebase/FirebaseHelper';

const AddAnExpense = ({ navigation }) => {
    const [item, setItem] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [quantity, setQuantity] = useState('1'); // Default to 1
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(['1', '2', '3', '4', '5']); // Dropdown options
  

    const handleSave = async () => {
        if (!item || !unitPrice || !quantity) {
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

  return (
    <View>
      <Text>Add an Expense</Text>
      <TextInput
        placeholder="Item"
        onChangeText={(text) => setItem(text)}
      />
      <TextInput
        placeholder="Unit Price (positive integer)"
        onChangeText={(text) => setUnitPrice(text)}
        keyboardType="numeric"
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items.map((val) => ({ label: val, value: val }))}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Quantity"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  )
}

export default AddAnExpense

const styles = StyleSheet.create({})