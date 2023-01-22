// setup Buffer or process
import 'node-libs-expo/globals';
import 'react-native-get-random-values';

import * as Random from 'expo-random';

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

//"postinstall": "node_modules/.bin/rn-nodeify --install crypto,assert,stream --hack"

import React, { useContext } from 'react';
import { View, Text, Button, TextInput, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import EnrollProduct from './screens/EnrollProduct';
import ShipProduct from './screens/ShipProduct';
import ReceiveProduct from './screens/ReceiveProduct';
import Test from './screens/Test';
import AppContextProvider from './AppContextProvider';
import styles from './styles';
import AppContext from './AppContext';
import Account from './screens/Account';

/**
 * Setup
 * =====
 * -
 */

//     "postinstall": "node_modules/.bin/rn-nodeify --install crypto,assert,stream --hack"

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/adaptive-icon.png')}
    />
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState('');

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title='Done'
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true
          });
        }}
      />
    </>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title='Go to Details... again'
        onPress={() => navigation.push('Details')}
      />
      <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
      <Button title='Go back' onPress={() => navigation.goBack()} />
      <Button
        title='Go back to first screen in stack'
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function ServerAddress() {
  const { state } = useContext(AppContext);

  return (
    <View>
      <Text style={styles.title}>Server Address: {state.value}</Text>
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
              headerRight: () => <Button title='Update count' />
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
