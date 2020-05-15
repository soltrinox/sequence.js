import React, { useState, useEffect } from 'react';

import * as arcadeum from '@arcadeum/provider'
import { Web3Provider, TransactionResponse } from 'ethers/providers'
import { useTransactionsQueue, PendingTransactionRequest, useTransactionsHistory } from '../contexts/LocalStorage'
import { amountFormatter } from '../utils'
import { Redirect } from 'react-router-dom'
import { Box, Text, Button, TextProps } from 'rebass'
import { Label } from '@rebass/forms'

type ApproveProps = {
  wallet?: arcadeum.Wallet,
  provider?: Web3Provider
}

const valueStyle = {
  fontSize: [ 1 ],
  textAlign: 'left',
  marginBottom: 3,
  fontWeight: 'bold',
  color: 'primary'
} as TextProps

export function Approve(props: ApproveProps) {
  const [pending, setPending] = useState<PendingTransactionRequest>()
  const [sending, setSending] = useState<Promise<TransactionResponse>>()

  const [transactions,, removeTransaction] = useTransactionsQueue()
  const [,addTransactionToHistory] = useTransactionsHistory()

  useEffect(() => {
    if (transactions) setPending(transactions[0])
  }, [transactions])

  function cancelTx(tx?: PendingTransactionRequest) {
    removeTransaction(tx)
  }

  function approveTx(tx?: PendingTransactionRequest) {
    if (!tx) return

    // Sends the transaction using the arcadeum relayer
    const sending = props.wallet?.sendTransaction(tx.tx)
    setSending(sending)
    sending?.then((receipt) => {
      addTransactionToHistory({ receipt: receipt, tx: tx.tx })
      setSending(undefined)
      removeTransaction(tx)
    })
  }

  return (
    <Box
      as='form'
      onSubmit={(e) => e.preventDefault()}
    >
      {!pending && (!transactions || transactions.length === 0) && <Redirect to="/home/" />}
      <Text
        fontSize={[ 3 ]}
        fontWeight='bold'
        color='primary'
        textAlign='left'
        marginBottom={3}>
        Approve transaction
      </Text>
      <Box width={1} px={2}>
        <Label>Recipient</Label>
        <Text {...valueStyle}>
          {pending?.tx?.to}
        </Text>
      </Box>
      <Box width={1} px={2}>
        <Label htmlFor='name'>Amount</Label>
        <Text {...valueStyle}>
          {amountFormatter(pending ? pending.tx?.value : 0, 18, 3)} ETH
        </Text>
      </Box>
      { pending?.tx.data && <Box width={1} px={2}>
        <Label htmlFor='name'>Data</Label>
        <Text {...valueStyle}
          sx={{ overflowWrap: 'break-word' }}>
          {pending?.tx.data}
        </Text>
      </Box>}
      {!sending && <Box width={1} px={2} marginTop={3}>
        <Button m={1} onClick={() => cancelTx(pending)}>
          Cancel
        </Button>
        <Button m={1} onClick={() => approveTx(pending)}>
          Approve
        </Button>
      </Box>}
      {sending && <Box width={1} px={2} marginTop={3}>
        <Button m={1}>
          Sending...
        </Button>
      </Box>}
    </Box>
  )
}
