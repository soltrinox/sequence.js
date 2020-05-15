import React, { useEffect, useState } from 'react'
import * as arcadeum from '@arcadeum/provider'
import { BigNumberish } from 'ethers/utils'
import { Web3Provider } from 'ethers/providers'
import { ethers } from 'ethers'
import { abi as erc20abi } from "../abi/erc20"
import { amountFormatter } from "../utils"
import { useHistory } from 'react-router-dom'
import { Box, Text } from 'rebass'

const RAW_ASSETS = [
  'ETH',
  '0xded81db9401bacf29325b4377e7243f9af8fd3bf'
]

type Asset = {
  name?: String,
  symbol?: String,
  address: String,
  decimals: BigNumberish
}

type Balance = {
  asset: Asset,
  amount: BigNumberish
}

type BalancesProps = {
  wallet?: arcadeum.Wallet,
  provider?: Web3Provider
}

type BalancesState = {
  balances: Balance[]
}

async function loadAsset(provider: Web3Provider, wallet: string, address: string): Promise<Balance[]> {
  if (address === 'ETH') {
    return [{
      asset: {
        symbol: 'ETH',
        name: 'Ether',
        address: address,
        decimals: 18
      },
      amount: await provider.getBalance(wallet)
    }]
  } else {
    const contract = new ethers.Contract(address, erc20abi, provider)

    const name = contract.name()
    const symbol = contract.symbol()
    const decimals = contract.decimals()
    const balance = contract.balanceOf(wallet)

    return [{
      asset: {
        symbol: await symbol,
        name: await name,
        address: address,
        decimals: await decimals
      },
      amount: await balance
    }]
  }
}


export function Balances(props: BalancesProps) {
  const [state, setState] = useState<BalancesState>({ balances: []})

  const history = useHistory()

  const walletAddress = props.wallet?.address
  const provider = props.provider

  useEffect(() => {
    if (walletAddress && provider) {
      Promise.all(RAW_ASSETS.map((a) => loadAsset(provider, walletAddress, a))).then((balances) => {
        setState({ balances: balances.flat() } )
      })
    }
  }, [walletAddress, provider])

  return (
    <Box p={1} my={1}>
      { state.balances.map((balance) =>
        <Box
          p={4}
          marginBottom={2}
          sx={{ borderRadius: '10px', cursor: 'pointer' }}
          bg='#eeeeee'
          key={balance.asset?.symbol?.toString()}
          onClick={() => history.push(balance.asset.address === 'ETH' ? '/send' : `/send/${balance.asset.address}`) }>
          <Text
            fontSize={[ 4 ]}
            fontWeight='bold'
            color='primary'
            textAlign='left'>
            {balance.asset.name}
          </Text>
          <Text
            key={balance.asset.address?.toString()}
            fontSize={[ 1 ]}
            fontWeight='bold'
            color='primary'
            textAlign='left'>
            {(() => {
              const decimals = balance.asset?.decimals ? balance.asset.decimals : 0
              const formatted = amountFormatter(balance.amount, ethers.utils.bigNumberify(decimals).toNumber(), 3)
              const symbol = balance.asset?.symbol ? balance.asset.symbol : 'UNK'

              return <>{ formatted } { symbol }</>
            })()}
          </Text>
        </Box>
      )}
    </Box>
  )
}
