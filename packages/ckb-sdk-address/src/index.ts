import ECPair from '@nervosnetwork/ckb-sdk-utils/lib/ecpair'
import * as utils from '@nervosnetwork/ckb-sdk-utils'
import { AddressOptions } from '@nervosnetwork/ckb-sdk-utils/lib/address'

const { hexToBytes, pubkeyToAddress, blake160, AddressPrefix, AddressType } = utils

class Address extends ECPair {
  public value = ''

  public identifier = ''

  public constructor(
    sk: Uint8Array | string,
    {
      addressAlgorithm = pubkeyToAddress,
      prefix = AddressPrefix.Testnet,
      type = AddressType.HashIdx,
      codeHashIndex = '0x00',
    }: Partial<
      {
        addressAlgorithm: Function
      } & AddressOptions
    > = {
      addressAlgorithm: pubkeyToAddress,
      prefix: AddressPrefix.Testnet,
      type: AddressType.HashIdx,
      codeHashIndex: '0x00',
    }
  ) {
    super(typeof sk === 'string' ? hexToBytes(sk) : sk)
    this.value = addressAlgorithm(this.publicKey, {
      prefix,
      type,
      codeHashIndex,
    })
    this.identifier = blake160(this.publicKey as string, 'hex')
  }
}

export default Address
