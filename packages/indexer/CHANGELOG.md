# @0xsequence/indexer

## 1.9.5

### Patch Changes

- RpcRelayer prioritize project access key

## 1.9.4

### Patch Changes

- waas: fix network dependency

## 1.9.3

### Patch Changes

- provider: don't append access key to RPC url if user has already provided it

## 1.9.2

### Patch Changes

- network: add xai-sepolia

## 1.9.1

### Patch Changes

- analytics fix

## 1.9.0

### Minor Changes

- waas release

## 1.8.8

### Patch Changes

- update metadata bindings

## 1.8.7

### Patch Changes

- provider: update databeat to 0.9.1

## 1.8.6

### Patch Changes

- guard: SignedOwnershipProof

## 1.8.5

### Patch Changes

- guard: signOwnershipProof and isSignedOwnershipProof

## 1.8.4

### Patch Changes

- network: add homeverse to networks list

## 1.8.3

### Patch Changes

- api: introduce basic linked wallet support

## 1.8.2

### Patch Changes

- provider: don't initialize analytics unless explicitly requested

## 1.8.1

### Patch Changes

- update to analytics provider

## 1.8.0

### Minor Changes

- provider: project analytics

## 1.7.2

### Patch Changes

- 0xsequence: ChainId should not be exported as a type
- account, wallet: fix nonce selection

## 1.7.1

### Patch Changes

- network: add missing avalanche logoURI

## 1.7.0

### Minor Changes

- provider: projectAccessKey is now required

### Patch Changes

- network: add NetworkMetadata.logoURI property for all networks

## 1.6.3

### Patch Changes

- network list update

## 1.6.2

### Patch Changes

- auth: projectAccessKey option
- wallet: use 12 bytes for random space

## 1.6.1

### Patch Changes

- core: add simple config from subdigest support
- core: fix encode tree with subdigest
- account: implement buildOnChainSignature on Account

## 1.6.0

### Minor Changes

- account, wallet: parallel transactions by default

### Patch Changes

- provider: emit disconnect on sign out

## 1.5.0

### Minor Changes

- signhub: add 'signing' signer status

### Patch Changes

- auth: Session.open: onAccountAddress callback
- account: allow empty transaction bundles

## 1.4.9

### Patch Changes

- rename SequenceMetadataClient to SequenceMetadata

## 1.4.8

### Patch Changes

- account: Account.getSigners

## 1.4.7

### Patch Changes

- update indexer client bindings

## 1.4.6

### Patch Changes

- - add sepolia networks, mark goerli as deprecated
  - update indexer client bindings

## 1.4.5

### Patch Changes

- indexer/metadata: update client bindings
- auth: selectWallet with new address

## 1.4.4

### Patch Changes

- indexer: update bindings
- auth: handle jwt expiry

## 1.4.3

### Patch Changes

- guard: return active status from GuardSigner.getAuthMethods

## 1.4.2

### Patch Changes

- guard: update bindings

## 1.4.1

### Patch Changes

- network: remove unused networks
- signhub: orchestrator interface
- guard: auth methods interface
- guard: update bindings for pin and totp
- guard: no more retry logic

## 1.4.0

### Minor Changes

- project access key support

## 1.3.0

### Minor Changes

- signhub: account children

### Patch Changes

- guard: do not throw when building deploy transaction
- network: snowtrace.io -> subnets.avax.network/c-chain

## 1.2.9

### Patch Changes

- account: AccountSigner.sendTransaction simulateForFeeOptions
- relayer: update bindings

## 1.2.8

### Patch Changes

- rename X-Sequence-Token-Key header to X-Access-Key

## 1.2.7

### Patch Changes

- add x-sequence-token-key to clients

## 1.2.6

### Patch Changes

- Fix bind multicall provider

## 1.2.5

### Patch Changes

- Multicall default configuration fixes

## 1.2.4

### Patch Changes

- provider: Adding missing payment provider types to PaymentProviderOption
- provider: WalletRequestHandler.notifyChainChanged

## 1.2.3

### Patch Changes

- auth, provider: connect to accept optional authorizeNonce

## 1.2.2

### Patch Changes

- provider: allow createContract calls
- core: check for explicit zero address in contract deployments

## 1.2.1

### Patch Changes

- auth: use sequence api chain id as reference chain id if available

## 1.2.0

### Minor Changes

- split services from session, better local support

## 1.1.15

### Patch Changes

- guard: remove error filtering

## 1.1.14

### Patch Changes

- guard: add GuardSigner.onError

## 1.1.13

### Patch Changes

- provider: pass client version with connect options
- provider: removing large from BannerSize

## 1.1.12

### Patch Changes

- provider: adding bannerSize to ConnectOptions

## 1.1.11

### Patch Changes

- add homeverse configs

## 1.1.10

### Patch Changes

- handle default EIP6492 on send

## 1.1.9

### Patch Changes

- Custom default EIP6492 on client

## 1.1.8

### Patch Changes

- metadata: searchMetadata: add types filter

## 1.1.7

### Patch Changes

- adding signInWith connect settings option to allow dapps to automatically login their users with a certain provider optimizing the normal authentication flow

## 1.1.6

### Patch Changes

- metadata: searchMetadata: add chainID and excludeTokenMetadata filters

## 1.1.5

### Patch Changes

- account: re-compute meta-transaction id for wallet deployment transactions

## 1.1.4

### Patch Changes

- network: rename base-mainnet to base
- provider: override isDefaultChain with ConnectOptions.networkId if provided

## 1.1.3

### Patch Changes

- provider: use network id from transport session
- provider: sign authorization using ConnectOptions.networkId if provided

## 1.1.2

### Patch Changes

- provider: jsonrpc chain id fixes

## 1.1.1

### Patch Changes

- network: add base mainnet and sepolia
- provider: reject toxic transaction requests

## 1.1.0

### Minor Changes

- Refactor dapp facing provider

## 1.0.5

### Patch Changes

- network: export network constants
- guard: use the correct global for fetch
- network: nova-explorer.arbitrum.io -> nova.arbiscan.io

## 1.0.4

### Patch Changes

- provider: accept name or number for networkId

## 1.0.3

### Patch Changes

- Simpler isValidSignature helpers

## 1.0.2

### Patch Changes

- add extra signature validation utils methods

## 1.0.1

### Patch Changes

- add homeverse testnet

## 1.0.0

### Major Changes

- https://sequence.xyz/blog/sequence-wallet-light-state-sync-full-merkle-wallets

## 0.43.34

### Patch Changes

- auth: no jwt for indexer

## 0.43.33

### Patch Changes

- Adding onConnectOptionsChange handler to WalletRequestHandler

## 0.43.32

### Patch Changes

- add Base Goerli network

## 0.43.31

### Patch Changes

- remove AuxDataProvider, add promptSignInConnect

## 0.43.30

### Patch Changes

- add arbitrum goerli testnet

## 0.43.29

### Patch Changes

- provider: check availability of window object

## 0.43.28

### Patch Changes

- update api bindings

## 0.43.27

### Patch Changes

- Add rpc is sequence method

## 0.43.26

### Patch Changes

- add zkevm url to enum

## 0.43.25

### Patch Changes

- added polygon zkevm to mainnet networks

## 0.43.24

### Patch Changes

- name change from zkevm to polygon-zkevm

## 0.43.23

### Patch Changes

- update zkEVM name to Polygon zkEVM

## 0.43.22

### Patch Changes

- add zkevm chain

## 0.43.21

### Patch Changes

- api: update client bindings

## 0.43.20

### Patch Changes

- indexer: update bindings

## 0.43.19

### Patch Changes

- session proof update

## 0.43.18

### Patch Changes

- rpc client global check, hardening

## 0.43.17

### Patch Changes

- rpc clients, check of 'global' is defined

## 0.43.16

### Patch Changes

- ethers peerDep to v5, update rpc client global use

## 0.43.15

### Patch Changes

- - provider: expand receiver type on some util methods

## 0.43.14

### Patch Changes

- bump

## 0.43.13

### Patch Changes

- update rpc bindings

## 0.43.12

### Patch Changes

- provider: single wallet init, and add new unregisterWallet() method

## 0.43.11

### Patch Changes

- fix lockfiles
- re-add mocha type deleter

## 0.43.10

### Patch Changes

- various improvements

## 0.43.9

### Patch Changes

- update deps

## 0.43.8

### Patch Changes

- network: JsonRpcProvider with caching

## 0.43.7

### Patch Changes

- provider: fix wallet network init

## 0.43.6

### Patch Changes

- metadatata: update rpc bindings

## 0.43.5

### Patch Changes

- provider: do not set default network for connect messages
- provider: forward missing error message

## 0.43.4

### Patch Changes

- no-change version bump to fix incorrectly tagged snapshot build

## 0.43.3

### Patch Changes

- metadata: update bindings

## 0.43.2

### Patch Changes

- provider: implement connectUnchecked

## 0.43.1

### Patch Changes

- update to latest ethauth dep

## 0.43.0

### Minor Changes

- move ethers to a peer dependency

## 0.42.10

### Patch Changes

- add auxDataProvider

## 0.42.9

### Patch Changes

- provider: add eip-191 exceptions

## 0.42.8

### Patch Changes

- provider: skip setting intent origin if we're unity plugin

## 0.42.7

### Patch Changes

- Add sign in options to connection settings

## 0.42.6

### Patch Changes

- api bindings update

## 0.42.5

### Patch Changes

- relayer: don't treat missing receipt as hard failure

## 0.42.4

### Patch Changes

- provider: add custom app protocol to connect options

## 0.42.3

### Patch Changes

- update api bindings

## 0.42.2

### Patch Changes

- disable rinkeby network

## 0.42.1

### Patch Changes

- wallet: optional waitForReceipt parameter

## 0.42.0

### Minor Changes

- relayer: estimateGasLimits -> simulate
- add simulator package

### Patch Changes

- transactions: fix flattenAuxTransactions
- provider: only filter nullish values
- provider: re-map transaction 'gas' back to 'gasLimit'

## 0.41.3

### Patch Changes

- api bindings update

## 0.41.2

### Patch Changes

- api bindings update

## 0.41.1

### Patch Changes

- update default networks

## 0.41.0

### Minor Changes

- relayer: fix Relayer.wait() interface

  The interface for calling Relayer.wait() has changed. Instead of a single optional ill-defined timeout/delay parameter, there are three optional parameters, in order:

  - timeout: the maximum time to wait for the transaction receipt
  - delay: the polling interval, i.e. the time to wait between requests
  - maxFails: the maximum number of hard failures to tolerate before giving up

  Please update your codebase accordingly.

- relayer: add optional waitForReceipt parameter to Relayer.relay

  The behaviour of Relayer.relay() was not well-defined with respect to whether or not it waited for a receipt.
  This change allows the caller to specify whether to wait or not, with the default behaviour being to wait.

### Patch Changes

- relayer: wait receipt retry logic
- fix wrapped object error
- provider: forward delegateCall and revertOnError transaction fields

## 0.40.6

### Patch Changes

- add arbitrum-nova chain

## 0.40.5

### Patch Changes

- api: update bindings

## 0.40.4

### Patch Changes

- add unreal transport

## 0.40.3

### Patch Changes

- provider: fix MessageToSign message type

## 0.40.2

### Patch Changes

- Wallet provider, loadSession method

## 0.40.1

### Patch Changes

- export sequence.initWallet and sequence.getWallet

## 0.40.0

### Minor Changes

- add sequence.initWallet(network, config) and sequence.getWallet() helper methods

## 0.39.6

### Patch Changes

- indexer: update client bindings

## 0.39.5

### Patch Changes

- provider: fix networkRpcUrl config option

## 0.39.4

### Patch Changes

- api: update client bindings

## 0.39.3

### Patch Changes

- add request method on Web3Provider

## 0.39.2

### Patch Changes

- update umd name

## 0.39.1

### Patch Changes

- add Aurora network
- add origin info for accountsChanged event to handle it per dapp

## 0.39.0

### Minor Changes

- abstract window.localStorage to interface type

## 0.38.2

### Patch Changes

- provider: add Settings.defaultPurchaseAmount

## 0.38.1

### Patch Changes

- update api and metadata rpc bindings

## 0.38.0

### Minor Changes

- api: update bindings, change TokenPrice interface
- bridge: remove @0xsequence/bridge package
- api: update bindings, rename ContractCallArg to TupleComponent

## 0.37.1

### Patch Changes

- Add back sortNetworks - Removing sorting was a breaking change for dapps on older versions which directly integrate sequence.

## 0.37.0

### Minor Changes

- network related fixes and improvements
- api: bindings: exchange rate lookups

## 0.36.13

### Patch Changes

- api: update bindings with new price endpoints

## 0.36.12

### Patch Changes

- wallet: skip remote signers if not needed
- auth: check that signature meets threshold before requesting auth token

## 0.36.11

### Patch Changes

- Prefix EIP191 message on wallet-request-handler

## 0.36.10

### Patch Changes

- support bannerUrl on connect

## 0.36.9

### Patch Changes

- minor dev xp improvements

## 0.36.8

### Patch Changes

- more connect options (theme, payment providers, funding currencies)

## 0.36.7

### Patch Changes

- fix missing break

## 0.36.6

### Patch Changes

- wallet_switchEthereumChain support

## 0.36.5

### Patch Changes

- auth: bump ethauth to 0.7.0
  network, wallet: don't assume position of auth network in list
  api/indexer/metadata: trim trailing slash on hostname, and add endpoint urls
  relayer: Allow to specify local relayer transaction parameters like gas price or gas limit

## 0.36.4

### Patch Changes

- Updating list of chain ids to include other ethereum compatible chains

## 0.36.3

### Patch Changes

- provider: pass connect options to prompter methods

## 0.36.2

### Patch Changes

- transactions: Setting target to 0x0 when empty to during SequenceTxAbiEncode

## 0.36.1

### Patch Changes

- metadata: update client with more fields

## 0.36.0

### Minor Changes

- relayer, wallet: fee quote support

## 0.35.12

### Patch Changes

- provider: rename wallet.commands to wallet.utils

## 0.35.11

### Patch Changes

- provider/utils: smoother message validation

## 0.35.10

### Patch Changes

- upgrade deps

## 0.35.9

### Patch Changes

- provider: window-transport override event handlers with new wallet instance

## 0.35.8

### Patch Changes

- provider: async wallet sign in improvements

## 0.35.7

### Patch Changes

- config: cache wallet configs

## 0.35.6

### Patch Changes

- provider: support async signin of wallet request handler

## 0.35.5

### Patch Changes

- wallet: skip threshold check during fee estimation

## 0.35.4

### Patch Changes

- - browser extension mode, center window

## 0.35.3

### Patch Changes

- - update window position when in browser extension mode

## 0.35.2

### Patch Changes

- - provider: WindowMessageHandler accept optional windowHref

## 0.35.1

### Patch Changes

- wallet: update config on undeployed too

## 0.35.0

### Minor Changes

- - config: add buildStubSignature
  - provider: add checks to signing cases for wallet deployment and config statuses
  - provider: add prompt for wallet deployment
  - relayer: add BaseRelayer.prependWalletDeploy
  - relayer: add Relayer.feeOptions
  - relayer: account for wallet deployment in fee estimation
  - transactions: add fromTransactionish
  - wallet: add Account.prependConfigUpdate
  - wallet: add Account.getFeeOptions

## 0.34.0

### Minor Changes

- - upgrade deps

## 0.31.0

### Minor Changes

- - upgrading to ethers v5.5

## 0.30.0

### Minor Changes

- - upgrade most deps

## 0.29.8

### Patch Changes

- update api

## 0.29.3

### Patch Changes

- indexer: add bridge contract types

## 0.29.0

### Minor Changes

- major architectural changes in Sequence design

  - only one API instance, API is no longer a per-chain service
  - separate per-chain indexer service, API no longer handles indexing
  - single contract metadata service, API no longer serves metadata

  chaind package has been removed, indexer and metadata packages have been added

  stronger typing with new explicit ChainId type

  multicall fixes and improvements

  forbid "wait" transactions in sendTransactionBatch calls
