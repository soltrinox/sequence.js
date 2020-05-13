# Arcadeum provider Wallet connect demo

## How to use

The wallet works on Mainnet, the `REACT_APP_RELAYER_PK` must contain enough ETH to perform at least 3 transactions.

> The camera API only works using https or localhost

```
REACT_APP_ARCADEUM_FACTORY=<Arcadeum factory contract address> \
REACT_APP_ARCADEUM_MAIN_MODULE=<Arcadeum main module contract address> \
REACT_APP_WALLET_PK=<Private key of the arcadeum signer> \
REACT_APP_RELAYER_PK=<Private key of the relayer> \
REACT_APP_RPC_URL=<Ethereum Mainnet RPC URL> \
yarn start
```

> Notice: This app is a demo, the private keys aren't securely stored and there is no authentication layer.
