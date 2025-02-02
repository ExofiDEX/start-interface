import { BigNumber } from '@ethersproject/bignumber'
import { Zero } from '@ethersproject/constants'
import { useSushiContract } from 'app/hooks/useContract'
import { useActiveWeb3React } from 'app/services/web3'
import { useCallback } from 'react'

import { Chef } from './enum'
import { useChefContract } from './hooks'

export default function useMasterChef(chef: Chef) {
  const { account } = useActiveWeb3React()

  const sushi = useSushiContract()

  const contract = useChefContract(chef)

  // Deposit
  const deposit = useCallback(
    async (pid: number, amount: BigNumber) => {
      try {
        let tx

        if (chef === Chef.MASTERCHEF) {
          tx = await contract?.deposit(pid, amount)
        } else {
          tx = await contract?.deposit(pid, amount, account)
        }

        return tx
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [account, chef, contract]
  )

  // Withdraw
  const withdraw = useCallback(
    async (pid: number, amount: BigNumber) => {
      try {
        let tx

        if (chef === Chef.MASTERCHEF) {
          tx = await contract?.withdraw(pid, amount)
        } else if (chef === Chef.MINICHEF || chef === Chef.OLD_FARMS) {
          tx = await contract?.withdrawAndHarvest(pid, amount, account)
        } else {
          tx = await contract?.withdraw(pid, amount, account)
        }

        return tx
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [account, chef, contract]
  )

  const harvest = useCallback(
    async (pid: number) => {
      try {
        let tx

        if (chef === Chef.MASTERCHEF) {
          tx = await contract?.deposit(pid, Zero)
        } else if (chef === Chef.MASTERCHEF_V2) {
          tx = await contract?.harvest(pid, account)
        } else if (chef === Chef.MINICHEF || chef === Chef.OLD_FARMS) {
          tx = await contract?.harvest(pid, account)
        }

        return tx
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [account, chef, contract, sushi]
  )

  return { deposit, withdraw, harvest }
}
