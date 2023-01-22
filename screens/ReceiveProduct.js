import { Button, Text, View } from 'react-native';

/**
 *
 */

function ReceiveProduct({ navigation }) {
  // const txParams = {
  //   methodName: 'receiveProduct',
  //   payloads: [productCode]
  // }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Enroll Product</Text>

      <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default ReceiveProduct;
