import React from 'react';
import * as arcadeum from '@arcadeum/provider'

import {
  Box,
  Card,
  Image,
  Heading,
  Text,
  Flex
} from 'rebass'

type AccountProps = {
  wallet?: arcadeum.Wallet
}

export function Account(props: AccountProps) {
  return (
    <Box
      p={2}>
      <Text
        fontSize={[ 1 ]}
        fontWeight='bold'
        color='primary'>
        Account: {props.wallet ? props.wallet.address : '...'}
      </Text>
    </Box>
  )
}
