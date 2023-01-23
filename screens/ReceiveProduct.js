import axios from 'axios';
import * as React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import AppContext from '../AppContext';
import * as transaction from '../services/transaction';

/**
 * ENROLL PRODUCT
 * - check product status?
 * - (product code is shipped to current Account)?
 */

function EnrollProduct({ navigation }) {
  const { state } = React.useContext(AppContext);
  const [productCode, setProductCode] = React.useState('');

  const handleSubmit = async () => {
    // sign transaction

    const txParams = {
      methodName: 'receiveProduct',
      payloads: [productCode]
    };

    const tx = transaction.create(state.currentAccount.privateKey, txParams);

    try {
      const { data } = await axios.post(
        `${state.serverIpAddress}/transactions`,
        tx
      );

      Alert.alert('successfully submitted');

      // reset value
      setProductCode('');
    } catch (error) {
      Alert.alert(error.response.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          <Text style={styles.titleText}>RECEIVE PRODUCT</Text>
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Product Code</Text>
        <TextInput
          style={styles.input}
          placeholder='type product code'
          onChangeText={(text) => setProductCode(text)}
          value={productCode}
        />
        <Button title='Submit' onPress={handleSubmit} />
      </View>

      <View style={styles.bottom}>
        <Button
          title='Go to Home'
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </SafeAreaView>
  );
}

export default EnrollProduct;
