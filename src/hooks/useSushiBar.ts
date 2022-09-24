import { CurrencyAmount, Token } from '@exoda/core-sdk'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import { useCallback } from 'react'

import { useSushiBarContract } from './useContract'

// const FERMION_POOLID = 8
const useSushiBar = () => {
  const addTransaction = useTransactionAdder()
  const barContract = useSushiBarContract()

  const enter = useCallback(
    async (amount: CurrencyAmount<Token> | undefined, account: string) => {
      if (amount?.quotient) {
        try {
          const tx = await barContract?.enter(amount?.quotient.toString(), account)
          return addTransaction(tx, { summary: 'Enter EXOFI in LHC' })
        } catch (e) {
          return e
        }
      }
    },
    [addTransaction, barContract]
  )

  const leave = useCallback(
    async (amount: CurrencyAmount<Token> | undefined, account: string) => {
      if (amount?.quotient) {
        try {
          // withdrawAndHarvest(uint256 pid, uint256 amount, address to)
          const tx = await barContract?.leave(amount?.quotient.toString(), account)
          return addTransaction(tx, { summary: 'Exit EXOFI from LHC' })
        } catch (e) {
          return e
        }
      }
    },
    [addTransaction, barContract]
  )

  return { enter, leave }
}

export default useSushiBar
