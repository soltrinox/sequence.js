import './App.css'

import RNWalletConnect from "@walletconnect/react-native"
import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import { Wallet, Provider, LocalRelayer } from '@arcadeum/provider'

const ethers = require('ethers')
const json = require('format-json')

// Etheruem RPC Provider
const PROVIDER_URI = process.env.REACT_APP_RPC_URL

// Arcadeum static context
const CONTEXT = {
  factory: process.env.REACT_APP_ARCADEUM_FACTORY,
  mainModule: process.env.REACT_APP_ARCADEUM_MAIN_MODULE
}

// Only for testing
const relayerWallet = new ethers.Wallet(process.env.REACT_APP_RELAYER_PK)
const localRelayer = new LocalRelayer(relayerWallet.connect(new ethers.providers.JsonRpcProvider(PROVIDER_URI)))

// Static wallet
const pk = process.env.REACT_APP_WALLET_PK

class QRScanComponent extends Component {
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={100}
          onError={this.handleError}
          onScan={this.props.handleScan}
          style={{ height: 440, width: 440 }}
        />
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super()

    this.state = {
      walletConnectToken: undefined,
      wallet: undefined,
      queue: []
    }
  }

  async componentDidMount() {
    // Create arcadeum wallet with a single owner
    const wallet = (await new Wallet.singleOwner(CONTEXT, pk)).connect(PROVIDER_URI, localRelayer)
    const provider = new Provider(wallet)
    // Store wallet and wallet provider
    this.setState({ wallet: wallet, provider: provider })
  }

  sessionRequest(error) {
    if (error) {
      throw error
    }

    // Wallet connect session request
    // all sessions are accepted
    this.state.walletConnector.approveSession({
      accounts: [this.state.wallet.address],
      chainId: 1
    })
  }

  callRequest(error, payload) {
    if (error) {
      throw error
    }

    // Put call request on queue
    this.setState({ queue: this.state.queue.concat(payload) })
  }

  onAccept(payload) {
    // Accept request using Arcadeum provider
    this.state.provider.sendAsync(payload, (error, response) => {
      if (error) {
        this.state.walletConnector.rejectRequest({
          id: payload.id,
          error: {
            message: error
          }
        })
      } else {
        this.state.walletConnector.approveRequest({
          id: response.id,
          result: response.result
        })
      }
    })

    // Remove item from queue
    this.setState({ queue: this.state.queue.filter((i) => i.id !== payload.id) })
  }

  onReject(payload) {
    // Reject call request
    this.state.walletConnector.rejectRequest({
      id: payload.id,
      error: {
        message: 'Rejected by user'
      }
    })

    // Remove item from queue
    this.setState({ queue: this.state.queue.filter((i) => i.id !== payload.id) })
  }
  
  handleScan(data) {
    if (!data || this.state.walletConnectToken) return

    // Connect to dApp using wallet connector
    const walletConnector = new RNWalletConnect(
      { uri: data },
      { clientMeta: {
        description: "Arcadeum Provider Test",
        url: "",
        icons: ["https://walletconnect.org/walletconnect-logo.png"],
        name: "Aracadeum-Provider-Wallet-Connect-Test"
      } }
    )

    walletConnector.on("session_request", (error, payload) => this.sessionRequest(error, payload))
    walletConnector.on("call_request", (error, payload) => this.callRequest(error, payload))

    this.setState({ walletConnector: walletConnector, walletConnectToken: data })
  }

  render() {
    return (
      <div style={{textAlign: 'left'}} className="App">
        { !this.state.walletConnectToken && <QRScanComponent handleScan={(d) => this.handleScan(d)}></QRScanComponent> }
        { this.state.walletConnectToken && <div style={{margin: 10}}>Connected!</div> }
        { this.state.queue.length !== 0 && <>
            <div style={{
              margin: 10,
              fontSize: 12,
              lineBreak: 'anywhere',
              whiteSpace: 'break-spaces'
            }}>{ json.plain(this.state.queue[0]) }</div>
            <button style={{margin: 10}} onClick={() => this.onAccept(this.state.queue[0])}>Accept</button>
            <button style={{margin: 10}} onClick={() => this.onReject(this.state.queue[0])}>Reject</button>
          </>
        }
      </div>
    )
  }
}


export default App
