import React from 'react'
import { Box, Text } from 'rebass'
import { useTransactionsHistory, RelayedTransaction } from '../contexts/LocalStorage'
import { amountFormatter } from '../utils'

export function Transactions() {
  const [transactions] = useTransactionsHistory()

  return (
    <Box>
      { transactions && transactions.map((transaction: RelayedTransaction, i: number) =>
      <Box p={2} sx={{ textAlign: 'left', overflowWrap: 'break-word' }} key={transaction.receipt?.hash}>
        <Text p={2}>
          To: {transaction.tx?.to}
        </Text>
        <Text p={2}>
          Value: {amountFormatter(transaction.tx?.value, 18, 3)}
        </Text>
        <Text p={2}>
          Data: {transaction.tx?.data}
        </Text>
        <Text p={2} >
          Hash: {transaction.receipt?.hash}
        </Text>
      {i > 0 && <hr style={{height: "1px", borderWidth: 0, color: "gray", backgroundColor: "gray"}}/>}
      </Box>
      ).reverse()}
      { !transactions && <Text p={2}>
        No transactions found  
      </Text>}
    </Box>
  )
}
