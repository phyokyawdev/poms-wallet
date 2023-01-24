import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';
import AppContext from '../AppContext';
import * as transaction from '../services/transaction';

import styles from './styles';
import axios from 'axios';

/**
 *
 */

function ShipProduct({ navigation }) {
  const { state } = useContext(AppContext);

  const [tx, setTx] = useState('');
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
  });

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setRecipientAddress(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const handleSubmit = async () => {
    if (!tx) {
      const txParams = {
        methodName: 'shipProduct',
        payloads: [recipientAddress, productCode]
      };

      setTx(transaction.create(state.currentAccount.privateKey, txParams));

      return;
    }

    try {
      const { data } = await axios.post(
        `${state.serverIpAddress}/transactions`,
        tx
      );

      Alert.alert('Shipping product success!');

      // reset value
      setRecipientAddress('');
      setProductCode('');
    } catch (error) {
      console.log(error.response.data);
      Alert.alert('Shipping product failed!');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>
            <Text style={styles.titleText}>SHIP PRODUCT</Text>
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.body}>
          <View>
            <Text selectable={true} style={styles.label}>
              Recipient Address
            </Text>
            <BarCodeScanner
              barCodeTypes={[Constants.BarCodeType.qr]}
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 200, margin: 8 }}
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
          {tx ? (
            <Button title='Submit' onPress={handleSubmit} />
          ) : (
            <Button title='Sign' onPress={handleSubmit} />
          )}
        </View>

        <View style={{ height: 30 }} />

        <View style={styles.bottom}>
          <Button
            title='Go to Home'
            onPress={() => navigation.navigate('Home')}
          />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

export default ShipProduct;
