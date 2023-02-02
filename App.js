// setup Buffer or process
import 'node-libs-expo/globals';

// fix for old browser error
import 'react-native-get-random-values';

// implement window.getRandomValues(), for packages that rely on it
if (typeof window === 'object') {
  if (!window.crypto) window.crypto = {};
  if (!window.crypto.getRandomValues) {
    window.crypto.getRandomValues = async function getRandomValues(arr) {
      let orig = arr;
      if (arr.byteLength != arr.length) {
        // Get access to the underlying raw bytes
        arr = new Uint8Array(arr.buffer);
      }
      const bytes = await Random.getRandomBytesAsync(arr.length);
      for (var i = 0; i < bytes.length; i++) {
        arr[i] = bytes[i];
      }

      return orig;
    };
  }
}

// fix for axios's toJSON parsing of BigInt
BigInt.prototype.toJSON = function () {
  return this.toString();
};

import React, { useContext } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import EnrollProduct from './screens/EnrollProduct';
import ShipProduct from './screens/ShipProduct';
import ReceiveProduct from './screens/ReceiveProduct';
import Test from './screens/Test';
import styles from './screens/styles';
import AppContext, { AppContextProvider } from './AppContext';
import Account from './screens/Account';
import ProductInfo from './screens/ProductInfo';

/**
 * Setup
 * =====
 * -
 */
const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/adaptive-icon.png')}
    />
  );
}

function ServerAddress() {
  const { state } = useContext(AppContext);

  return (
    <View>
      <Text style={styles.title}>Server Address: {state.serverIpAddress}</Text>
    </View>
  );
}

function CurrentAccountAddress() {
  const { state } = useContext(AppContext);

  return (
    <View>
      <Text style={styles.title}>{state.currentAccount.address}</Text>
    </View>
  );
}

/**
 * HERDER COMPONENT FOR ALL SCREEN
 * - server ip address
 * - current account address
 */
function Header() {
  return (
    <View>
      <ServerAddress />
      <CurrentAccountAddress />
    </View>
  );
}

function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={({ navigation, route }) => ({
              title: 'Overview',
              headerTitle: (props) => <LogoTitle {...props} />,
              headerRight: () => {
                const { state } = useContext(AppContext);

                if (
                  !(
                    state.currentAccount.privateKey &&
                    state.currentAccount.address
                  )
                )
                  return;

                return (
                  <Button
                    title='Account'
                    onPress={() => navigation.navigate('Account')}
                  />
                );
              }
            })}
          />
          <Stack.Screen
            name='EnrollProduct'
            component={EnrollProduct}
            options={() => ({
              title: 'Enroll Product',
              headerTitle: () => <ServerAddress />
            })}
          />
          <Stack.Screen
            name='ShipProduct'
            component={ShipProduct}
            options={() => ({
              title: 'Enroll Product',
              headerTitle: () => <ServerAddress />
            })}
          />
          <Stack.Screen
            name='ReceiveProduct'
            component={ReceiveProduct}
            options={() => ({
              title: 'Enroll Product',
              headerTitle: () => <ServerAddress />
            })}
          />
          <Stack.Screen
            name='Account'
            component={Account}
            options={() => ({
              title: 'Account Screen',
              headerTitle: (props) => <ServerAddress />
            })}
          />
          <Stack.Screen
            name='ProductInfo'
            component={ProductInfo}
            options={() => ({
              title: 'Product Information',
              headerTitle: (props) => <ServerAddress />
            })}
          />
          <Stack.Screen
            name='Test'
            component={Test}
            options={() => ({
              title: 'Test Screen',
              headerTitle: (props) => <ServerAddress />
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}

export default App;
