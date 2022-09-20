import { CurrencyAmount, Token } from '@exoda/core-sdk'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import { useCallback } from 'react'

import { useMasterChefV2Contract } from './useContract'

const FERMION_POOLID = 8
const useSushiBar = () => {
  const addTransaction = useTransactionAdder()
  const barContract = useMasterChefV2Contract()

  const enter = useCallback(
    async (amount: CurrencyAmount<Token> | undefined, account: string) => {
      if (amount?.quotient) {
        try {
          const tx = await barContract?.deposit(FERMION_POOLID, amount?.quotient.toString(), account)
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
          const tx = await barContract?.withdraw(FERMION_POOLID, amount?.quotient.toString(), account)
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
