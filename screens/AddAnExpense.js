import { View, Text, TextInput, Button, Alert, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { writeToDB } from '../firebase/FirebaseHelper';
import colors from '../colors';
import PressableButton from '../components/PressableButton';
import ExpenseForm from '../components/ExpenseForm';
import { isDataValid } from '../components/ValidateInput';
import SaveCancelButtons from '../components/SaveCancelButtons';

const AddAnExpense = ({ navigation }) => {
    const [item, setItem] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [quantity, setQuantity] = useState(''); // Default to null
    const [overbudgetLimit] = useState(500);

    const saveExpense = async () => {
        if(!isDataValid(item,unitPrice,quantity)) {
          return;
        }
      
          const totalExpense = parseInt(unitPrice) * parseInt(quantity);
          const newExpenseEntry = {
            item,
            unitPrice: parseInt(unitPrice), 
            quantity: parseInt(quantity),
            overbudget: totalExpense > overbudgetLimit,
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
        <ExpenseForm
            item={item}
            unitPrice={unitPrice}
            quantity={quantity}
            onItemChange={(text) => setItem(text)}
            onUnitPriceChange={(text) => setUnitPrice(text)}
            onQuantityChange={(val) => setQuantity(val)}
          />
          <SaveCancelButtons onCancel={handleCancel} onSave={saveExpense} />

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
})