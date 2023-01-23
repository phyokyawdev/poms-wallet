import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContext from '../AppContext';
import styles from './styles';

import * as account from '../services/account';

/**
 * set up global context for server ip address here
 * - setup serverIpAddress context
 * - setup currentAccount: { privateKey, address }
 */

function CurrentAccount() {
  return (
    <View>
      <Text style={styles.label}>Select Currentt Account</Text>
    </View>
  );
}

/**
 * CONNECT TO SERVER (PING)
 * - text input (server address)
 * - button (onclick -> ping to server address provided)
 * - if success
 *    - set server address to context
 * - else
 *    - show error
 *
 * - post current account address to server *
 *  - get data returned (owned item list here?) *
 *  - set up connection by posting address to client *
 */

function SetupConnection() {
  const { state, setState } = useContext(AppContext);

  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // network request with use effect
  const handleSubmit = async () => {
    console.log(address);
    setIsSubmitting(true);
    try {
      await axios.get(`${address}/health`);
      Alert.alert('Success', 'The server is up');

      //set context value
      setState({ serverIpAddress: address, ...state });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'some error');
    }
    setIsSubmitting(false);
  };

  return (
    <View>
      <Text style={styles.label}>Server Ip Address</Text>
      <TextInput
        style={styles.input}
        placeholder='type ip address of server'
        onChangeText={(text) => setAddress(text)}
        value={address}
        defaultValue={state.serverIpAddress}
      />
      <Button
        title='Setup Connection'
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </View>
  );
}

/**
 * setup account option list here
 */
function SetupCurrentAccount() {
  const { state, setState } = useContext(AppContext);

  const [privateKey, setPrivateKey] = useState('');

  /**
   * if empty -> generate new account
   * if exist -> set account
   */
  const handleSubmit = () => {
    if (!privateKey) {
      // generate new account if no privateKey
      const { privateKey: newPrivateKey } = account.create();
      setPrivateKey(newPrivateKey);
      return;
    }

    // set up account if privateKey
    const currentAccount = account.createFromPrivateKey(privateKey);
    console.log(currentAccount);
    setState({ currentAccount });
  };

  return (
    <View>
      <Text style={styles.label}>
        Current Account: {state.currentAccount.address}
      </Text>
      <TextInput
        style={styles.input}
        placeholder='type or generate private key'
        onChangeText={(text) => setPrivateKey(text)}
        value={privateKey}
        defaultValue={state.currentAccount.privateKey}
      />
      {privateKey ? (
        <Button title='Setup Account' onPress={handleSubmit} />
      ) : (
        <Button title='Generate Account' onPress={handleSubmit} />
      )}
    </View>
  );
}

function HomeScreen({ route, navigation }) {
  const { state, setState } = useContext(AppContext);

  // useEffect(() => {
  //   const currentAccount = account.create();
  //   console.log('current account: ', currentAccount);
  //   setState({ currentAccount });
  // }, []);
  const isReady = () => {
    return true;
    return (
      state.serverIpAddress &&
      state.currentAccount.privateKey &&
      state.currentAccount.address
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          <Text style={styles.titleText}>POMS Home</Text>
        </Text>
      </View>

      <View style={styles.body}>
        <SetupCurrentAccount />
        <SetupConnection />
      </View>

      {isReady() && (
        <View style={styles.bottom}>
          <Button
            title='Enroll Product'
            onPress={() =>
              navigation.navigate('EnrollProduct', {
                // enroll product properties
              })
            }
          />

          <Button
            title='Ship Product'
            onPress={() =>
              navigation.navigate('ShipProduct', {
                // ship product properties
              })
            }
          />

          <Button
            title='Receive Product'
            onPress={() =>
              navigation.navigate('ReceiveProduct', {
                // receive product properties
              })
            }
          />

          <Button
            title='Account Screen'
            onPress={() =>
              navigation.navigate('Account', {
                // receive product properties
              })
            }
          />

          <Button
            title='Test Screen'
            onPress={() =>
              navigation.navigate('Test', {
                // receive product properties
              })
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default HomeScreen;
