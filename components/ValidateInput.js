import { Alert } from 'react-native';
export function isDataValid(item, unitPrice, quantity) {
    if (!item || !unitPrice || !quantity || quantity === '0') {
        Alert.alert('Invalid Data', 'Please fill in all fields');
        return false;
    }
  
    if (isNaN(unitPrice) || isNaN(quantity) || unitPrice < 0 || quantity < 0) {
        Alert.alert('Invalid Data', 'Please enter valid numeric values');
        return false;
    }
  
    return true;
  }
  