import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpenseForm from '../components/ExpenseForm'
import colors from '../colors';

const EditScreen = ({ route }) => {
    const { entryId, item, unitPrice, quantity } = route.params;
  
    return (
      <View style={styles.container}>
        <ExpenseForm
          item={item}
          unitPrice={unitPrice}
          quantity={quantity}
          
        />
        {/* Other components or buttons for editing and saving */}
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