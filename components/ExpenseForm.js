import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'; 
import colors from '../colors';

const ExpenseForm = ({ item, unitPrice, quantity, onItemChange, onUnitPriceChange, onQuantityChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const quantities = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <View style={styles.formContainer}>
      <View style={styles.formField}>
        <Text style={styles.labelText}>Item *</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={onItemChange}
          value={item}
        />
      </View>
      <View style={styles.formField}>
        <Text style={styles.labelText}>Unit Price *</Text>
        <TextInput
          style={styles.inputField}
          onChangeText={onUnitPriceChange}
          value={unitPrice}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.formField}>
        <Text style={styles.labelText}>Quantity *</Text>
        <DropDownPicker
          placeholder={quantity}
          open={open}
          value={value}
          items={quantities.map((val) => ({ label: val, value: val }))}
          setOpen={setOpen}
          setValue={(val) => {
            setValue(val);
            onQuantityChange(val);
          }}
          style={styles.inputField}
        />
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
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
})
