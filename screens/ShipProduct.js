import { Button, Text, View } from 'react-native';

/**
 *
 */

function ShipProduct({ navigation }) {
  // const txParams = {
  //   methodName: 'shipProduct',
  //   payloads: [userOneAddress, productCode]
  // }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Ship Product</Text>

      <Button title='Go to Home' onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default ShipProduct;
