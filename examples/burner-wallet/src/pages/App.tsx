import React, { useState, useEffect } from 'react'
import './App.css'

import { Account } from '../components/account'
import { Send } from '../components/send'
import { Balances } from '../components/balances'
import { Approve } from '../components/approve'

import { useMnemonic } from '../contexts/LocalStorage'
import { Web3Provider, JsonRpcProvider } from 'ethers/providers'

import * as ethers from 'ethers'
import * as arcadeum from '@arcadeum/provider'
import { Switch, Route, BrowserRouter, Redirect, Link } from 'react-router-dom'

import preset from '@rebass/preset'
import { ThemeProvider } from 'emotion-theming'

import { Box, Text, Flex } from 'rebass'
import { Transactions } from '../components/transactions'

const theme = {
  ...preset,
}

const ARCADEUM_CONTEXT = {
  factory: '0x52f0F4258c69415567b21dfF085C3fd5505D5155',
  mainModule: '0x621821390a694d4cBfc5892C52145B8D93ACcdEE',
  mainModuleUpgradable: '0xC7cE8a07f69F226E52AEfF57085d8C915ff265f7'
}

const RPC_PROVIDER = process.env.REACT_APP_RPC_URL as string

// Create local relayer
// TODO Connect to relayer server
const relayerSigner = new ethers.Wallet(process.env.REACT_APP_RELAYER_PK!).connect(new JsonRpcProvider(RPC_PROVIDER))
const LOCAL_RELAYER = new arcadeum.LocalRelayer(relayerSigner)

function App() {
  const [mnemonic, setMnemonic] = useMnemonic()
  const [state, setState] = useState<{ wallet?: arcadeum.Wallet, provider?: Web3Provider }>({})

  useEffect(() => {
    let signer: ethers.Wallet

    if (!mnemonic) {
      signer = ethers.Wallet.createRandom()
      setMnemonic(signer.mnemonic)
    } else {
      signer = ethers.Wallet.fromMnemonic(mnemonic)
    }

    // Create arcadeum wallet instance
    arcadeum.Wallet.singleOwner(ARCADEUM_CONTEXT, signer).then((wallet) => {
      // Connect wallet to provider and relayer
      wallet.setProvider(RPC_PROVIDER)
      wallet.setRelayer(LOCAL_RELAYER)

      // Create arecadeum provider
      const provider = new Web3Provider(new arcadeum.Provider(wallet))

      setState({
        provider: provider,
        wallet: wallet
      })
    })
  }, [mnemonic, setMnemonic])

  const arcadeumProps = { wallet: state.wallet, provider: state.provider }

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <Box
          minHeight={750}
          my={4}
          sx={{
            maxWidth: '75%',
            mx: 'auto',
            px: 3
          }}
        >
          <Link to='/home' style={{ textDecoration: 'none' }}>
            <Text
              fontSize={[ 4 ]}
              fontWeight='bold'
              color='primary'
              textAlign='left'
              my={2}>
              Sequence Burner wallet
            </Text>
          </Link>
          <Flex
            px={2}
            bg='black'
            sx={{ borderRadius: '10px' }}>
            <Account {...arcadeumProps} />
          </Flex>
          <Flex flexWrap='wrap' mx={-1} >
            <Box width={[1, 1, 1/3]}>
              <Balances {...arcadeumProps}></Balances>
            </Box>
            <Box width={[1, 1, 2/3]}>
              <Box p={4} mx={1} my={2} sx={{ borderRadius: '10px' }} bg='#eeeeee'>
                <Switch>
                  <Route path="/home">
                    <Transactions></Transactions>
                  </Route>
                  <Route
                    path="/send/:asset"
                    render={({ match }) => {
                      return (
                        <Send {...arcadeumProps} asset={match.params.asset}></Send>
                      )
                    }}
                  />
                  <Route path="/send/">
                    <Send {...arcadeumProps}></Send>
                  </Route>
                  <Route path="/approve/">
                    <Approve {...arcadeumProps}></Approve>
                  </Route>
                  <Redirect to="/home" />
                </Switch>
              </Box>
            </Box>
          </Flex>
        </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
