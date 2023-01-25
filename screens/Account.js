import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContext from '../AppContext';

import styles from './styles';
/**
 * Component for testing
 * - show address of currently selected account
 * - show qr code
 * - show back
 *
 * - create new account
 *  - replace current account inside context
 */

function Account({ navigation }) {
  const { state } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Text style={styles.title}>
            <Text style={styles.titleText}>ACCOUNT INFORMATION</Text>
          </Text>
        </View>
      </SafeAreaView>

      <View style={styles.body}>
        <Text style={styles.label}>Current Account:</Text>
        <Text selectable={true} style={styles.label}>
          {state.currentAccount.address}
        </Text>
        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
          {state.currentAccount.address && (
            <QRCode
              value={state.currentAccount.address}
              logoSize={200}
              size={200}
              width={200}
              height={200}
            />
          )}
        </View>
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

export default Account;
