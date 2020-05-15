import React from 'react';
import * as arcadeum from '@arcadeum/provider'

import { Box, Text } from 'rebass'

type AccountProps = {
  wallet?: arcadeum.Wallet
}

export function Account(props: AccountProps) {
  return (
    <Box p={2} >
      <Text
        fontSize={[ 1 ]}
        fontWeight='bold'
        color='white'>
        Account: {props.wallet ? props.wallet.address : '...'}
      </Text>
    </Box>
  )
}
