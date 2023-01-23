import * as ethWallet from 'ethereumjs-wallet';
import * as util from '@ethereumjs/util';

export const create = () => {
  const addressData = ethWallet.default.generate();

  /**
   * Private Key
   * - 32 bytes
   * - represented by 64 hex characters
   */
  const privateKey = addressData.getPrivateKeyString();

  /**
   * Address
   * - 20 bytes
   * - represented by 40 hex characters
   */
  const address = addressData.getAddressString();

  /**
   * Public Key
   * - no practical use for public key, so it is omitted.
   */
  return {
    privateKey,
    address
  };
};

export const createFromPrivateKey = (privateKey) => {
  const privateKeyBuffer = util.toBuffer(privateKey);
  const addressBuffer = util.privateToAddress(privateKeyBuffer);
  const address = util.bufferToHex(addressBuffer);

  return {
    privateKey,
    address
  };
};
