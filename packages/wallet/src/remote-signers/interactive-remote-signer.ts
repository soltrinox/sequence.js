import { BytesLike, ethers } from 'ethers'
import { Deferred } from '../utils'
import { CancelableRemoteSigner, RemoteSigner } from './remote-signer'

type SignRequest = {
  data?: BytesLike,
  promise: Deferred<string>
}

export class InteractiveRemoteSigner extends RemoteSigner implements CancelableRemoteSigner {
  public readonly requests: Record<number, Record<string, SignRequest>> = {}
  public readonly signatures: Record<number, Record<string, string>> = {}
  public readonly canceled: Record<number, Record<string, { reason: any }>> = {}

  constructor(public address: string) {
    super()
  }

  async signMessageWithData(message: BytesLike, data?: BytesLike, chainId: number = -1): Promise<string> {
    const hexMessage = ethers.utils.hexlify(message)

    // See if the request was canceled
    if (this.canceled[chainId][hexMessage]) {
      const reason = this.canceled[chainId][hexMessage].reason
      delete this.canceled[chainId][hexMessage]
      throw reason
    }

    // See if the signature is already stored
    if (this.signatures[chainId][hexMessage]) {
      const signature =  this.signatures[chainId][hexMessage]
      delete this.signatures[chainId][hexMessage]
      return signature
    }

    // Create the chainId record
    if (!this.requests[chainId]) {
      this.requests[chainId] = {}
    }

    // Weird, but if request already exist we return that
    if (this.requests[chainId][hexMessage]) {
      return this.requests[chainId][hexMessage].promise
    }

    // Save the request for later
    const promise = new Deferred<string>()
    this.requests[chainId][hexMessage] = { data, promise }
    return promise
  }

  async getAddress(): Promise<string> {
    return this.address
  }

  addSignature(message: BytesLike, signature: string, chainId: number = -1) {
    const hexMessage = ethers.utils.hexlify(message)

    // Resolve if we have a pending request
    if (this.requests[chainId][hexMessage]) {
      this.requests[chainId][hexMessage].promise.resolve(signature)
      delete this.requests[chainId][hexMessage]
      return
    }

    // Create the chainId record
    if (!this.signatures[chainId]) {
      this.signatures[chainId] = {}
    }

    // Or else save the signature for later
    this.signatures[chainId][hexMessage] = signature
  }

  cancel(message: BytesLike, chainId: number = -1, reason?: any): void {
    const hexMessage = ethers.utils.hexlify(message)

    // See if the signature is already stored and delete it
    if (this.signatures[chainId][hexMessage]) {
      delete this.signatures[chainId][hexMessage]
    }

    // Cancel request if we have a pending request
    if (this.requests[chainId][hexMessage]) {
      this.requests[chainId][hexMessage].promise.reject(reason)
      delete this.requests[chainId][hexMessage]
      return
    }

    // Create the chainId record
    if (!this.canceled[chainId]) {
      this.canceled[chainId] = {}
    }

    // Or else save the cancelation for later
    this.canceled[chainId][hexMessage] = { reason }
  }
}
