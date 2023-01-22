import axios from 'axios';
import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';
import AppContext from '../AppContext';
import * as transaction from '../services/transaction';

/**
 *
 */

function EnrollProduct({ navigation }) {
  const [productCode, setProductCode] = React.useState('');
  const { state } = React.useContext(AppContext);

  const handleSubmit = async () => {
    // sign transaction

    /**
     * method signature
     * - transaction.create(manufacturerPrivateKey, {
     *    methodName: 'enrollProduct',
     *    payloads: [productCode]
     *  })
     */

    const txParams = {
      methodName: 'enrollProduct',
      payloads: ['123456']
    };

    console.log(txParams);

    const tx = transaction.create(
      '0x78cafb987e3b90cecadd70af6d8b065d194d9de9ba4b7b39a5ca046019762138',
      txParams
    );

    try {
      console.log(tx);
      const { data } = await axios.post(
        `${state.serverIpAddress}/transactions`,
        tx
      );
      // show response data as alert
      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          <Text style={styles.titleText}>ENROLL PRODUCT</Text>
        </Text>
      </View>
      <View style={styles.body}>
        <Text selectable={true} style={styles.label}>
          Product Code
        </Text>
        <TextInput
          style={styles.input}
          placeholder='type ip address of server'
          onChangeText={(text) => setProductCode(text)}
          defaultValue={productCode}
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
