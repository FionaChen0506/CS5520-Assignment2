import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React, { useLayoutEffect } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import colors from '../colors';
import DeleteButton from '../components/DeleteButton';

const EditScreen = ({ route,navigation }) => {
    const { entryId, item, unitPrice, quantity } = route.params;
    
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


    return (
      <View style={styles.container}>
        <ExpenseForm
          item={item}
          unitPrice={unitPrice}
          quantity={quantity}
          
        />
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