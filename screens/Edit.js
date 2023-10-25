import { StyleSheet, Text, View, TouchableOpacity, Alert,} from 'react-native'
import React, { useLayoutEffect,useState } from 'react'
import Checkbox from 'expo-checkbox';
import ExpenseForm from '../components/ExpenseForm'
import colors from '../colors';
import DeleteButton from '../components/DeleteButton';
import SaveCancelButtons from '../components/SaveCancelButtons';
import { updateInDB } from '../firebase/FirebaseHelper';
import { isDataValid } from '../components/ValidateInput';

const EditScreen = ({ route,navigation }) => {
    const { entryId, item, unitPrice, quantity, } = route.params;
    const [editedItem, setEditedItem] = useState(item);
    const [editedUnitPrice, setEditedUnitPrice] = useState(unitPrice);
    const [editedQuantity, setEditedQuantity] = useState(quantity);
    const [isOverbudget, setIsOverbudget] = useState(route.params.overbudget);
    const [overbudgetLimit] = useState(500);
    const [isChecked, setChecked] = useState(false);

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
        if (!isDataValid(editedItem, editedUnitPrice, editedQuantity)) {
          return;
        }
      
        Alert.alert(
          'Important',
          'Are you sure you want to save these changes?',
          [
            {
              text: 'No', 
              style: 'cancel', // This makes it a "Cancel" action
            },
            {
              text: 'Yes',
              // this is the real "save" action
              onPress: () => {
                const totalExpense = parseInt(editedUnitPrice) * parseInt(editedQuantity);
                let updatedOverbudget;

                if (isChecked) {
                  // If the checkbox is checked, set "overbudget" to false
                  updatedOverbudget = false;
                } else {
                  // If the checkbox is not checked, update "overbudget" based on the totalExpense
                  updatedOverbudget = totalExpense > overbudgetLimit;
                }
                
                // Prepare the updated entry object
                const updatedEntry = {
                  item: editedItem,
                  unitPrice: editedUnitPrice,
                  quantity: editedQuantity,
                  overbudget: updatedOverbudget,
                };
      
                // Call the updateInDB function to update the entry
                updateInDB(entryId, updatedEntry);
      
                // Navigate back to the previous screen
                navigation.goBack();
              },
            },
          ]
        );
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

        {isOverbudget && (
        <View style={styles.checkboxContainer}>
            <Text style={styles.checkText}>
                This item is marked as overbudget. 
                Select the checkbox if you would like to approve it.
            </Text>
            <Checkbox
                style={styles.checkbox}
                value={isChecked}
                title="Overbudget"
                onValueChange={setChecked}
                color={isChecked ? colors.tealText : undefined} 
            />
            
        </View>
        )}

        <SaveCancelButtons onCancel={handleCancel} onSave={handleSave} />
      
      </View>
    );
  };
  
  export default EditScreen;
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.tealLight,
    },

    checkboxContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 4,
        marginHorizontal: 10,
        //marginTop:"25%",
    },

    checkText:{
        color:colors.tealText,
        fontWeight: 'bold',
    },
})