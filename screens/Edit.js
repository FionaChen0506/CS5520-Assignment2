import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native'
import React, { useLayoutEffect,useState } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import colors from '../colors';
import DeleteButton from '../components/DeleteButton';
import PressableButton from '../components/PressableButton';
import { updateInDB } from '../firebase/FirebaseHelper';
import { isDataValid } from '../components/ValidateInput';

const EditScreen = ({ route,navigation }) => {
    const { entryId, item, unitPrice, quantity } = route.params;
    const [editedItem, setEditedItem] = useState(item);
    const [editedUnitPrice, setEditedUnitPrice] = useState(unitPrice);
    const [editedQuantity, setEditedQuantity] = useState(quantity);
    const [overbudgetLimit] = useState(500);

    const handleItemChange = (text) => {
        setEditedItem(text);
    };
    
    const handleUnitPriceChange = (text) => {
        setEditedUnitPrice(text);
    };
    
    const handleQuantityChange = (val) => {
        setEditedQuantity(val);
    };

    const onDeleteSuccess = () => {
        navigation.goBack();
    };

    // Define the navigation tab options
    useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: () => (
            <DeleteButton entryId={entryId} onDeleteSuccess={onDeleteSuccess} />
        ),
        });
    }, [navigation, onDeleteSuccess]);

    const handleSave = () => {
        if(!isDataValid(editedItem, editedUnitPrice, editedQuantity)) {
            return;
        }
        
        const totalExpense = parseInt(editedUnitPrice) * parseInt(editedQuantity);
        // Prepare the updated entry object
        const updatedEntry = {
          item: editedItem,
          unitPrice: editedUnitPrice,
          quantity: editedQuantity,
          overbudget: totalExpense > overbudgetLimit,
        };
    
        // Call the updateInDB function to update the entry
        updateInDB(entryId, updatedEntry);
    
        // Navigate back to the previous screen
        navigation.goBack();
    };

    const handleCancel = () => {
        navigation.goBack();
      };

    return (
      <View style={styles.container}>
        <ExpenseForm
          item={editedItem}
          unitPrice={editedUnitPrice}
          quantity={editedQuantity}
          onItemChange={handleItemChange}
          onUnitPriceChange={handleUnitPriceChange}
          onQuantityChange={handleQuantityChange}
        />

            <PressableButton
                pressedFunction={handleCancel}
                pressedStyle={styles.buttonPressed}
                defaultStyle={styles.buttonDefault}
            >
                <Text style={styles.buttonText}>Cancel</Text>
            </PressableButton>

            <PressableButton
                pressedFunction={handleSave}
                pressedStyle={styles.buttonPressed}
                defaultStyle={styles.buttonDefault}
            >
                <Text style={styles.buttonText}>Save</Text>
            </PressableButton>
      
      </View>
    );
  };
  
  export default EditScreen;
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: colors.tealLight,
      },
})