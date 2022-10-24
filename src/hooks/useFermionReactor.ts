import { Currency, CurrencyAmount } from '@exoda/core-sdk'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import { useCallback } from 'react'
import { useEffect, useState } from 'react'

import { useFermionReactorContract } from './useContract'

const useFermionReactor = () => {
  const addTransaction = useTransactionAdder()
  const fermionReactorContract = useFermionReactorContract()
  const [purchaseRate, setPurchaseRate] = useState(0)
  const [minimumLimit, setMinimumLimit] = useState('')
  const [maximumLimit, setMaximumLimit] = useState('')
  const buy = useCallback(
    async (amount: CurrencyAmount<Currency> | undefined) => {
      if (amount?.quotient) {
        try {
          const tx = await fermionReactorContract?.buyFermion({
            value: amount?.quotient.toString(),
          })
          return addTransaction(tx, { summary: 'Purchase EXOFI from Reactor' })
        } catch (e) {
          return e
        }
      }
    },
    [addTransaction, fermionReactorContract]
  )
  const rate = useCallback(async () => {
    try {
      const rate = await fermionReactorContract?.getRate()
      setPurchaseRate(rate.toNumber())
      return rate
    } catch (e) {
      return e
    }
  }, [fermionReactorContract])
  useEffect(() => {
    if (fermionReactorContract) {
      rate()
    }
  }, [rate, fermionReactorContract, setPurchaseRate])

  const minimumCap = useCallback(async () => {
    try {
      const minCap = await fermionReactorContract?.getLowerEthLimit()
      setMinimumLimit(minCap.toString())
      return minCap
    } catch (e) {
      return e
    }
  }, [fermionReactorContract])
  useEffect(() => {
    if (fermionReactorContract) {
      minimumCap()
    }
  }, [minimumCap, fermionReactorContract, setMinimumLimit])

  const maximumCap = useCallback(async () => {
    try {
      const maxCap = await fermionReactorContract?.getUpperEthLimit()
      setMaximumLimit(maxCap.toString())
      return maxCap
    } catch (e) {
      return e
    }
  }, [fermionReactorContract])
  useEffect(() => {
    if (fermionReactorContract) {
      maximumCap()
    }
  }, [maximumCap, fermionReactorContract, setMaximumLimit])

  return { buy, purchaseRate, minimumLimit, maximumLimit }
}

export default useFermionReactor
