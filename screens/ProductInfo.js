import axios from 'axios';
import * as React from 'react';
import { Alert, Button, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as util from '@ethereumjs/util';
import styles from './styles';
import AppContext from '../AppContext';

/**
 * ENROLL PRODUCT
 * -
 */

function ProductInfo({ navigation }) {
  const { state } = React.useContext(AppContext);
  const [productCode, setProductCode] = React.useState('');
  /**
   * productInfo
   * - productCode
   * - owner
   * - status
   * - recipient?
   */
  const [productInfo, setProductInfo] = React.useState({});

  const handleSubmit = async () => {
    try {
      const { data } = await axios.get(
        `${state.serverIpAddress}/information/products/${productCode}`
      );

      setProductInfo(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error fetching product information');
    }
  };

  const getOwner = () => {
    const currentAddress = util.stripHexPrefix(state.currentAccount.address);
    const ownerAddress = util.stripHexPrefix(productInfo.owner);
    if (currentAddress === ownerAddress) return 'YOU';

    return `0x${ownerAddress}`;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View>
          <Text style={styles.title}>
            <Text style={styles.titleText}>ENROLL PRODUCT</Text>
          </Text>
        </View>
      </SafeAreaView>
      <View style={styles.body}>
        <Text selectable={true} style={styles.label}>
          Product Code
        </Text>
        <TextInput
          style={styles.input}
          placeholder='type product code'
          onChangeText={(text) => setProductCode(text)}
          defaultValue={productCode}
        />
        <Button title='Fetch Info' onPress={handleSubmit} />
      </View>
      {productInfo.productCode && (
        <View style={styles.middle}>
          <View style={{ margin: 8 }}>
            <Text style={styles.titleText}>Product Information</Text>
            <Text />
            <Text>Product Code: {productInfo.productCode}</Text>
            <Text>Owner: {getOwner()}</Text>
            <Text>Status: {productInfo.status}</Text>
            {productInfo.recipient && (
              <Text>Recipient: {productInfo.recipient}</Text>
            )}
          </View>
        </View>
      )}

      <View style={styles.bottom}>
        <Button
          title='Go to Home'
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </View>
  );
}

export default ProductInfo;
