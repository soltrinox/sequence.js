import { ethers, BytesLike, BigNumberish } from 'ethers'
import { Deferrable, resolveProperties } from '@ethersproject/properties'

export async function resolveArrayProperties<T>(object: Readonly<Deferrable<T>> | Readonly<Deferrable<T>>[]): Promise<T> {
  if (Array.isArray(object)) {
    // T must include array type
    return Promise.all(object.map((o) => resolveProperties(o))) as any
  }

  return resolveProperties(object)
}

export async function findLatestLog(provider: ethers.providers.Provider, filter: ethers.providers.Filter): Promise<ethers.providers.Log | undefined> {
  const toBlock = filter.toBlock === 'latest' ? await provider.getBlockNumber() : filter.toBlock as number
  const fromBlock = filter.fromBlock as number

  try {
    const logs = await provider.getLogs({ ...filter, toBlock: toBlock })
    return logs.length === 0 ? undefined : logs[logs.length - 1]
  } catch (e) {
    // TODO Don't assume all errors are bad
    const pivot = Math.floor(((toBlock - fromBlock) / 2) + fromBlock)
    const nhalf = await findLatestLog(provider, { ...filter, fromBlock: pivot, toBlock: toBlock })
    if (nhalf !== undefined) return nhalf
    return findLatestLog(provider, { ...filter, fromBlock: fromBlock, toBlock: pivot })
  }
}

export class Deferred<T> implements Promise<T> {
  private _resolveSelf: (val: T) => void;
  private _rejectSelf: (reason?: any) => void;

  private promise: Promise<T>

  constructor() {
    this.promise = new Promise((resolve, reject) =>
      {
        this._resolveSelf = resolve
        this._rejectSelf = reject
      }
    )
  }

  [Symbol.toStringTag]: string = 'Promise'

  public then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected)
  }

  public catch<TResult = never>(
    onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null
  ): Promise<T | TResult> {
    return this.promise.then(onrejected)
  }

  finally(onfinally?: (() => void) | null): Promise<T> {
    return this.promise.finally(onfinally)
  }

  public resolve(val:T) { this._resolveSelf(val) }
  public reject(reason:any) { this._rejectSelf(reason) }
}
