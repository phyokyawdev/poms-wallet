import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContext from '../AppContext';

import styles from '../styles';
/**
 * Component for testing
 * - show address of currently selected account
 * - show qr code
 * - show back
 */

function Account({ navigation }) {
  const { state } = useContext(AppContext);
  console.log(state.currentAccount);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          <Text style={styles.titleText}>CURRENT ACCOUNT INFORMATION</Text>
        </Text>
      </View>
      <View style={styles.body}>
        <Text selectable={true} style={styles.label}>
          {state.currentAccount.address}
        </Text>
        <View>
          <QRCode value={state.currentAccount.address} />
        </View>
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

export default Account;
