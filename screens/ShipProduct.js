import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';
import AppContext from '../AppContext';

import styles from './styles';

/**
 *
 */

function ShipProduct({ navigation }) {
  const { state } = useContext(AppContext);

  const [productCode, setProductCode] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');

  // barcode scanner
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setRecipientAddress(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const handleSubmit = async () => {
    // sign transaction

    const txParams = {
      methodName: 'shipProduct',
      payloads: [recipientAddress, productCode]
    };

    const tx = transaction.create(state.currentAccount.privateKey, txParams);

    try {
      const { data } = await axios.post(
        `${state.serverIpAddress}/transactions`,
        tx
      );

      Alert.alert('successfully submitted');

      // reset value
      setRecipientAddress('');
      setProductCode('');
    } catch (error) {
      Alert.alert(error.response.data);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          <Text style={styles.titleText}>Ship Product</Text>
        </Text>
      </View>

      <View style={styles.body}>
        <View>
          <Text selectable={true} style={styles.label}>
            Recipient Address
          </Text>
          <BarCodeScanner
            barCodeTypes={[Constants.BarCodeType.qr]}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 200, margin: 12 }}
          />
          {scanned && (
            <Button
              title={'Tap to Scan Again'}
              onPress={() => setScanned(false)}
            />
          )}
        </View>
        <View>
          <TextInput
            value={recipientAddress}
            style={styles.input}
            onChangeText={(text) => setRecipientAddress(text)}
            placeholder='Scan QR code'
          />
        </View>

        <View>
          <Text style={styles.label}>Product Code</Text>
          <TextInput
            value={productCode}
            style={styles.input}
            placeholder='type product code'
            onChangeText={(text) => setProductCode(text)}
          />
        </View>

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

export default ShipProduct;
