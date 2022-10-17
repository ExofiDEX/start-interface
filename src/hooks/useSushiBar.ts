import { ChainId, CurrencyAmount, FERMION_POOLID, Token } from '@exoda/core-sdk'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import { useCallback } from 'react'

import { useMasterChefContract } from './useContract'

const useSushiBar = () => {
  const addTransaction = useTransactionAdder()
  const barContract = useMasterChefContract()

  const enter = useCallback(
    async (amount: CurrencyAmount<Token> | undefined, account: string, chainId: number | undefined) => {
      if (amount?.quotient) {
        try {
          const tx = await barContract?.deposit(
            FERMION_POOLID[chainId ? chainId : ChainId.ETHEREUM],
            amount?.quotient.toString(),
            account
          )
          return addTransaction(tx, { summary: 'Enter EXOFI in LHC' })
        } catch (e) {
          return e
        }
      }
    },
    [addTransaction, barContract]
  )

  const leave = useCallback(
    async (amount: CurrencyAmount<Token> | undefined, account: string, chainId: number | undefined) => {
      if (amount?.quotient) {
        try {
          // withdrawAndHarvest(uint256 pid, uint256 amount, address to)
          const tx = await barContract?.withdrawAndHarvest(
            FERMION_POOLID[chainId ? chainId : ChainId.ETHEREUM],
            amount?.quotient.toString(),
            account
          )
          return addTransaction(tx, { summary: 'Exit EXOFI from LHC' })
        } catch (e) {
          return e
        }
      }
    },
    [addTransaction, barContract]
  )
  const harvest = useCallback(
    async (account: string | undefined | null, chainId: number | undefined) => {
      try {
        // withdrawAndHarvest(uint256 pid, uint256 amount, address to)
        const tx = await barContract?.harvest(FERMION_POOLID[chainId ? chainId : ChainId.ETHEREUM], account)
        return addTransaction(tx, { summary: 'Collect EXOFI Rewards from LHC' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, barContract]
  )

  return { enter, leave, harvest }
}

export default useSushiBar
