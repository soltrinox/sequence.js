import React, { useContext, useState, useEffect } from 'react'
import './App.css'

import { Account } from '../components/account'
import { Send } from '../components/send'
import { Balances } from '../components/balances'

import { useMnemonic } from '../contexts/LocalStorage'
import { Web3Provider } from 'ethers/providers'

import * as ethers from 'ethers'
import * as arcadeum from '@arcadeum/provider'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'

import preset from '@rebass/preset'
import { ThemeProvider } from 'emotion-theming'

import { Box, Text, Flex } from 'rebass'

const theme = {
  ...preset,
}

const ARCADEUM_CONTEXT = {
  factory: '0x52f0F4258c69415567b21dfF085C3fd5505D5155',
  mainModule: '0x621821390a694d4cBfc5892C52145B8D93ACcdEE',
  mainModuleUpgradable: '0xC7cE8a07f69F226E52AEfF57085d8C915ff265f7'
}

const RPC_PROVIDER = 'https://rinkeby.infura.io/v3/df1fe4ce54154742a0d85cca9bfa36ef'

function App() {
  const [mnemonic, setMnemonic] = useMnemonic()
  const [state, setState] = useState<{ wallet?: arcadeum.Wallet, provider?: Web3Provider }>({})

  useEffect(() => {
    let signer

    if (!mnemonic) {
      signer = ethers.Wallet.createRandom()
      setMnemonic(signer.mnemonic)
    } else {
      signer = ethers.Wallet.fromMnemonic(mnemonic)
    }
    
    arcadeum.Wallet.singleOwner(ARCADEUM_CONTEXT, signer).then((wallet) => {
      wallet.setProvider(RPC_PROVIDER)
      wallet.setRelayer({} as any) // TODO Add relayer
      const provider = new Web3Provider(new arcadeum.Provider(wallet))
      
      setState({
        provider: provider,
        wallet: wallet
      })
    })
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Box
        minHeight={750}
        sx={{
          maxWidth: '75%',
          mx: 'auto',
          px: 3,
          marginTop: '32px'
        }}>
        <Flex
          px={2}
          color='white'
          bg='black'
          alignItems='center'>
          <Account wallet={state.wallet} />
        </Flex>
        <Flex flexWrap='wrap' mx={-2} >
          <Box width={[1, 1, 1/3]}>
            <Balances wallet={state.wallet} provider={state.provider}></Balances>
          </Box>
          <Box marginLeft={2}>
            <BrowserRouter>
              <Switch>
                <Route exact strict path="/home">
                  <Box px={2} py={2} width={[1, 1, 2/3]}>
                    <Text p={1} bg='blue'>1/3</Text>
                  </Box>
                </Route>
                <Route
                  path="/send/:asset"
                  render={({ match }) => {
                    return (
                      <Send wallet={state.wallet} provider={state.provider} asset={match.params.asset}></Send>
                    )
                  }}
                />
                <Route path="/send/">
                  <Send wallet={state.wallet} provider={state.provider}></Send>
                </Route>
                <Redirect to="/home" />
              </Switch>
            </BrowserRouter>
          </Box>
        </Flex>
      </Box>
      </ThemeProvider>
    </div>
  )
}

export default App
