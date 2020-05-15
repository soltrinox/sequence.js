import React, { useState } from 'react';

import * as arcadeum from '@arcadeum/provider'
import { Web3Provider } from 'ethers/providers'
import { useTransactionsQueue } from '../contexts/LocalStorage'
import { useHistory } from 'react-router-dom'
import { abi as erc20abi } from "../abi/erc20"
import { Box, Text, Button } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'
import { ethers } from 'ethers';
import { ArcadeumTransaction } from '@arcadeum/provider';

type SendProps = {
  wallet?: arcadeum.Wallet,
  provider?: Web3Provider,
  asset?:string
}

export function Send(props: SendProps) {
  const [target, setTarget] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [data, setData] = useState<string>('')
  const history = useHistory()

  const [, addTransaction] = useTransactionsQueue()

  function onSend(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault()

    const id = Math.floor(new Date().getTime()).toString()
    let transaction: ArcadeumTransaction

    // Assumes that all tokens use 18 decimals
    // this is not really the case, it may cause problems with some tokens
    const parsedValue = ethers.utils.parseEther(value)

    if (!props.asset) {
      transaction = {
        delegateCall: false,
        revertOnError: false,
        gasLimit: "1000000",
        to: target,
        value: parsedValue,
        data: data === '' ? '0x00' : data
      }
    } else {
      const data = new ethers.Contract(
        props.asset,
        erc20abi,
        props.provider!
      ).interface.functions.transfer.encode([
        target,
        parsedValue
      ])

      transaction = {
        delegateCall: false,
        revertOnError: false,
        gasLimit: "1000000",
        to: props.asset,
        value: 0,
        data: data
      }
    }

    addTransaction({ id: id, tx: transaction })
    history.push('/approve/')
  }

  return (
    <Box
      as='form'
      onSubmit={onSend}>
      <Text
        fontSize={[ 3 ]}
        fontWeight='bold'
        color='primary'
        marginBottom={3}
        textAlign='left'>
        Sending {props.asset ? props.asset : 'ETH'}
      </Text>
      <Box width={1} px={2}>
        <Label htmlFor='name'>Recipient</Label>
        <Input
          id='to'
          name='to'
          placeholder='0x1234'
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </Box>
      <Box width={1} px={2} marginTop={3}>
        <Label htmlFor='name'>Amount</Label>
        <Input
          id='value'
          name='value'
          placeholder='0'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>
      {!props.asset && <Box width={1} px={2} marginTop={3}>
        <Label htmlFor='name'>Data</Label>
        <Textarea
          id='data'
          name='data'
          placeholder='0x (optional)'
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </Box>}
      <Box width={1} px={2} marginTop={3}>
        <Button>
          Send
        </Button>
      </Box>
    </Box>
  )
}
