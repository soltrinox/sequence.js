import { WalletConfig, DecodedSignature, isDecodedEOASigner, isDecodedFullSigner, isDecodedAddress, decodeSignature, recoverEOASigner, ConfigTracker } from '@0xsequence/config'
import { BytesLike, ethers, Contract } from 'ethers'
import { walletContracts } from '@0xsequence/abi'
import { isValidSignature } from './validate'
import { WalletContext } from '@0xsequence/network'

export interface DecodedOwner {
  weight: number
  address: string
}

export interface DecodedSigner {
  r: string
  s: string
  v: number
  t: number
  weight: number
}

export enum ImageHashSource {
  CounterFactual,
  Defined
}

export const fetchImageHash = async (
  address: string,
  provider: ethers.providers.Provider,
  counterFactualConfig?: {
    context: WalletContext,
    tracker: ConfigTracker
  }): Promise<string | undefined> => {
  const rih = await richFetchImageHash(address, provider, counterFactualConfig)
  if (rih) {
    return rih.imageHash
  }

  return undefined
}

export const richFetchImageHash = async (
  address: string,
  provider: ethers.providers.Provider,
  counterFactualConfig?: {
    context: WalletContext,
    tracker: ConfigTracker
  }): Promise<{ imageHash: string, source: ImageHashSource } | undefined> => {
  const walletContract = new Contract(address, walletContracts.mainModuleUpgradable.abi, provider)
  const currentImageHash = await (walletContract.functions.imageHash.call([]).catch(() => []))  as string[]

  // If we can read the contract, we just return the value
  if (currentImageHash && currentImageHash.length > 0) {
    return { imageHash: currentImageHash[0], source: ImageHashSource.Defined }
  }

  // If we can't we can try to get the counter factual state
  // but that's only possible if counterFactualConfig is provided
  if (counterFactualConfig) {
    const imageHash = await counterFactualConfig.tracker.imageHashOfCounterFactualWallet({ context: counterFactualConfig.context, wallet: address })
    if (imageHash) {
      return { imageHash, source: ImageHashSource.CounterFactual }
    }
  }

  // The imageHash can't be found
  return undefined
}

// recoverConfig decodes a WalletConfig from the subDigest and signature combo. Note: the subDigest argument
// is an encoding format of the original message, encoded by:
//
// subDigest = packMessageData(wallet.address, chainId, ethers.utils.keccak256(message))
export const recoverConfig = async (
  subDigest: BytesLike,
  signature: string | DecodedSignature,
  provider?: ethers.providers.Provider,
  context?: WalletContext,
  chainId?: number,
  walletSignersValidation?: boolean,
  configTracker?: ConfigTracker
): Promise<WalletConfig> => {
  const digest = ethers.utils.arrayify(ethers.utils.keccak256(subDigest))
  return recoverConfigFromDigest(digest, signature, provider, context, chainId, walletSignersValidation, configTracker)
}

// recoverConfigFromDigest decodes a WalletConfig from a digest and signature combo. Note: the digest
// is the keccak256 of the subDigest, see `recoverConfig` method.
export const recoverConfigFromDigest = async (
  digest: BytesLike,
  signature: string | DecodedSignature,
  provider?: ethers.providers.Provider,
  context?: WalletContext,
  chainId?: number,
  walletSignersValidation?: boolean,
  configTracker?: ConfigTracker
): Promise<WalletConfig> => {
  const decoded = (<DecodedSignature>signature).threshold !== undefined ? <DecodedSignature>signature : decodeSignature(signature as string)

  const signers = await Promise.all(decoded.signers.map(async (s) => {
    if (isDecodedEOASigner(s)) {
      return {
        weight: s.weight,
        address: recoverEOASigner(digest, s)
      }
    } else if (isDecodedAddress(s)) {
      return {
        weight: s.weight,
        address: ethers.utils.getAddress((<DecodedOwner>s).address)
      }
    } else if (isDecodedFullSigner(s)) {
      if (walletSignersValidation) {
        if (!provider) throw new Error('provider is required to validate wallet signers')
        if (!context) throw new Error('context is required to validate wallet signers')
        if (!chainId) throw new Error('chainId is required to validate wallet signers')
        if (!configTracker) throw new Error('configTracker is required to validate wallet signers')

        const signature = s.signature.substring(0, s.signature.length - 2)

        if (!(await isValidSignature({
          address: s.address,
          digest: ethers.utils.arrayify(digest),
          signature: ethers.utils.hexlify(signature),
          provider,
          context,
          chainId,
          configTracker
        }))) throw Error('Invalid signature')
      }

      return {
        weight: s.weight,
        address: s.address
      }
    } else {
      throw Error('Uknown signature type')
    }
  }))

  return {
    threshold: decoded.threshold,
    signers: signers
  }
}
