import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarCodeScanner, Constants } from 'expo-barcode-scanner';
import AppContext from '../AppContext';

import styles from './styles';
/**
 * Component for testing
 * - setup axios
 * - create object from input
 * - context
 * - network
 * - transaction
 */

const Separator = () => <View style={styles.separator} />;

function Test({ navigation }) {
  const [address, setAddress] = useState('');
  const { state } = useContext(AppContext);

  const [scannedData, setScannedData] = useState('');

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
    setScannedData(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
          <Text style={styles.titleText}>SOME BIG TITLE</Text>
        </Text>
      </View>

      <View style={styles.body}>
        <Text selectable={true} style={styles.label}>
          Some Label
        </Text>
        <TextInput
          style={styles.input}
          placeholder='type ip address of server'
          onChangeText={(text) => setAddress(text)}
          defaultValue={address}
        />

        <View>
          <BarCodeScanner
            barCodeTypes={[Constants.BarCodeType.qr]}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 200 }}
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
            value={scannedData}
            style={styles.input}
            placeholder='Scanned Data'
          />
        </View>
        <Button
          title='Press me'
          onPress={() => Alert.alert('Simple button pressed' + address)}
        />
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

export default Test;
