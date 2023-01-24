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
  const [tx, setTx] = React.useState('');
  const [productCode, setProductCode] = React.useState('');

  const handleSubmit = async () => {
    // sign transaction
    if (!tx) {
      const txParams = {
        methodName: 'receiveProduct',
        payloads: [productCode]
      };

      setTx(transaction.create(state.currentAccount.privateKey, txParams));
      return;
    }

    try {
      const { data } = await axios.post(
        `${state.serverIpAddress}/transactions`,
        tx
      );

      Alert.alert('Receiving product success!');

      // reset value
      setProductCode('');
    } catch (error) {
      console.log(error.response.data);
      Alert.alert('Receiving product failed!');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Text style={styles.title}>
            <Text style={styles.titleText}>RECEIVE PRODUCT</Text>
          </Text>
        </View>
      </SafeAreaView>
      <View style={styles.body}>
        <Text style={styles.label}>Product Code</Text>
        <TextInput
          style={styles.input}
          placeholder='type product code'
          onChangeText={(text) => setProductCode(text)}
          value={productCode}
        />
        {tx ? (
          <Button title='Submit' onPress={handleSubmit} />
        ) : (
          <Button title='Sign' onPress={handleSubmit} />
        )}
      </View>

      <View style={styles.bottom}>
        <Button
          title='Go to Home'
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
}

export default EnrollProduct;
