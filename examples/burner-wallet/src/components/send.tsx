import React, { ReactHTMLElement, useContext, useState } from 'react';

import * as arcadeum from '@arcadeum/provider'
import { Web3Provider } from 'ethers/providers'

import {
  Box,
  Card,
  Image,
  Heading,
  Text,
  Flex,
  Button
} from 'rebass'

import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox
} from '@rebass/forms'
import { BigNumberish } from 'ethers/utils';

type SendProps = {
  wallet?: arcadeum.Wallet,
  provider?: Web3Provider,
  asset?:string
}

export function Send(props: SendProps) {
  const [target, setTarget] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [data, setData] = useState<string>('')

  function onSend(e: React.FormEvent<HTMLDivElement>) {
    console.log(target)
    e.preventDefault()
  }

  return (
    <Box
      as='form'
      onSubmit={onSend}
      py={3}
    >
      <Text
        fontSize={[ 3 ]}
        fontWeight='bold'
        color='primary'
        textAlign='left'
        marginBottom={3}
      >
        Sending {props.asset ? props.asset : 'ETH'}
      </Text>
      <Box width={1} px={2}>
        <Label htmlFor='name'>Recipient</Label>
        <Input
          id='to'
          name='to'
          placeholder='0x1234'
          width='320px'
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
