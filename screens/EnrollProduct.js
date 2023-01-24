import axios from 'axios';
import * as React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import AppContext from '../AppContext';
import * as transaction from '../services/transaction';

/**
 * ENROLL PRODUCT
 * -
 */

function EnrollProduct({ navigation }) {
  const { state } = React.useContext(AppContext);
  const [productCode, setProductCode] = React.useState('');
  const [tx, setTx] = React.useState('');

  const handleSubmit = async () => {
    // sign transaction

    if (!tx) {
      const txParams = {
        methodName: 'enrollProduct',
        payloads: [productCode]
      };

      setTx(transaction.create(state.currentAccount.privateKey, txParams));
      return;
    }

    try {
      console.log('posting', tx);
      const { data } = await axios.post(
        `${state.serverIpAddress}/transactions`,
        tx
      );
      console.log('already posted');

      Alert.alert('successful');

      // reset value
      setProductCode('');
    } catch (error) {
      console.log('error happened');
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Text style={styles.title}>
            <Text style={styles.titleText}>ENROLL PRODUCT</Text>
          </Text>
        </View>
      </SafeAreaView>
      <View style={styles.body}>
        <Text selectable={true} style={styles.label}>
          Product Code
        </Text>
        <TextInput
          style={styles.input}
          placeholder='type product code'
          onChangeText={(text) => setProductCode(text)}
          defaultValue={productCode}
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
