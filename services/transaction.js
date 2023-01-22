import * as util from '@ethereumjs/util';

/**
 * Create Transaction
 */
export const create = (privateKey, txParams) => {
  // privateKey: '0x12344' -> privateKeyBuffer: Buffer
  const strippedPrivateKey = util.stripHexPrefix(privateKey);
  const privateKeyBuffer = Buffer.from(strippedPrivateKey, 'hex');

  // parse txParams.payloads
  const payloads = txParams.payloads.map((element) => {
    if (util.isHexString(element)) return util.stripHexPrefix(element);
    return element;
  });
  txParams.payloads = payloads;

  // txParams: {} -> msgHash: Buffer
  const jsonTxParam = JSON.stringify(txParams);
  const msgHash = util.hashPersonalMessage(Buffer.from(jsonTxParam));
  console.log('here');

  // generate signature
  const ecdsaSignature = util.ecsign(msgHash, privateKeyBuffer);

  return { txParams, ecdsaSignature };
};
