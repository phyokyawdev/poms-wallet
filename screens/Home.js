import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContext from '../AppContext';
import styles from './styles';

import * as account from '../services/account';

/**
 * set up global context for server ip address here
 * - setup serverIpAddress context
 * - setup currentAccount: { privateKey, address }
 */

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

  // network request with use effect
  const handleSubmit = async () => {
    console.log(address);
    try {
      const { data } = await axios.get(
        `${address}/information/connections/${state.currentAccount.address}`
      );
      Alert.alert('Success');

      //set context value
      setState({ ...state, serverIpAddress: address });
    } catch (error) {
      console.log(error);
      Alert.alert('Error');
    }
  };

  const hasServerIpAddress = () => {
    return !!state.serverIpAddress;
  };

  return (
    <View>
      <Text style={styles.label}>
        Server Ip Address:
        {hasServerIpAddress() ? (
          <Text style={{ color: 'green' }}>OK</Text>
        ) : (
          <Text style={{ color: 'red' }}>Not setted up</Text>
        )}
      </Text>
      <Text style={styles.label}>{state.serverIpAddress}</Text>
      <TextInput
        style={styles.input}
        placeholder='type ip address of server'
        onChangeText={(text) => setAddress(text)}
        value={address}
        defaultValue={state.serverIpAddress}
      />
      {!hasServerIpAddress() && (
        <Button title='Setup Connection' onPress={handleSubmit} />
      )}
      {hasServerIpAddress() && (
        <Button
          title='Clear Connection'
          onPress={() => setState({ ...state, serverIpAddress: '' })}
        />
      )}
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
    setState({ ...state, currentAccount });
  };

  const hasCurrentAccount = () => {
    return state.currentAccount.address && state.currentAccount.privateKey;
  };

  return (
    <View>
      <Text style={styles.label}>
        Current Account:{' '}
        {hasCurrentAccount() ? (
          <Text style={{ color: 'green' }}>OK</Text>
        ) : (
          <Text style={{ color: 'red' }}>Not setted up</Text>
        )}
      </Text>

      <Text selectable={true} style={styles.label}>
        {state.currentAccount.address}
      </Text>
      <TextInput
        style={styles.input}
        placeholder='type or generate private key'
        onChangeText={(text) => setPrivateKey(text)}
        value={privateKey}
        defaultValue={state.currentAccount.privateKey}
      />

      {!hasCurrentAccount() && privateKey && (
        <Button title='Setup Account' onPress={handleSubmit} />
      )}
      {!hasCurrentAccount() && !privateKey && (
        <Button title='Generate Account' onPress={handleSubmit} />
      )}

      {hasCurrentAccount() && (
        <Button
          title='Clear Account'
          onPress={() => setState({ ...state, currentAccount: {} })}
        />
      )}
    </View>
  );
}

function HomeScreen({ route, navigation }) {
  const { state, setState } = useContext(AppContext);

  const isReady = () => {
    return (
      state.serverIpAddress &&
      state.currentAccount.privateKey &&
      state.currentAccount.address
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Text style={styles.title}>
            <Text style={styles.titleText}>POMS HOME</Text>
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.body}>
          <SetupCurrentAccount />
          <SetupConnection />
        </View>

        <Separator />
        <View style={{ height: 30 }} />

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

            {/* <Button
              title='Account Screen'
              onPress={() =>
                navigation.navigate('Account', {
                  // receive product properties
                })
              }
            /> */}

            {/* <Button
              title='Test Screen'
              onPress={() =>
                navigation.navigate('Test', {
                  // receive product properties
                })
              }
            /> */}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;

const Separator = () => <View style={styles.separator} />;
