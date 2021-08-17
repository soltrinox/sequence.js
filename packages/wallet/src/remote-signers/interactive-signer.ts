import { ChainId } from "@0xsequence/network"
import { BytesLike } from "ethers"
import { RemoteSigner } from "."

export type SignRequest = {
  message: BytesLike,
  data?: BytesLike,
  chainId?: ChainId
}

export type SignRequestCallback = (event: {
  request: SignRequest
}) => void

export type SignedCallback = (event: {
  signature: string,
  request: SignRequest
}) => void

export type SignErrorCallback = (event: {
  error: Error,
  request: SignRequest
}) => void

export class InteractiveSigner extends RemoteSigner {
  private _onSignRequest: SignRequestCallback[] = []
  private _onSigned: SignedCallback[] = []
  private _onSignError: SignErrorCallback[] = []

  constructor (private signer: RemoteSigner) {
    super()
  }

  onSignRequest(callback: SignRequestCallback): () => void {
    this._onSignRequest.push(callback)
    return () => { this._onSignRequest = this._onSignRequest.filter((c) => c !== callback) }
  }

  onSigned(callback: SignedCallback): () => void {
    this._onSigned.push(callback)
    return () => { this._onSigned = this._onSigned.filter((c) => c !== callback) }
  }

  onSignError(callback: SignErrorCallback): () => void {
    this._onSignError.push(callback)
    return () => { this._onSignError = this._onSignError.filter((c) => c !== callback) }
  }

  async signMessageWithData(
    message: BytesLike,
    data?: BytesLike,
    chainId?: ChainId
  ): Promise<string> {
    const request = { message, data, chainId }

    this._onSignRequest.forEach((c) => c({ request }))

    try {
      const signature = await this.signer.signMessageWithData(message, data, chainId)
      this._onSigned.forEach((c) => c({ request, signature }))
      return signature
    } catch (error) {
      this._onSignError.forEach((c) => c({ request, error }))
      throw error
    }
  }

  getAddress(): Promise<string> {
    return this.signer.getAddress()
  }
}
