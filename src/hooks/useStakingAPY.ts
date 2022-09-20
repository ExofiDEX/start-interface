import { ChainId, Currency, SUSHI } from '@exoda/core-sdk'
import { useAverageBlockTime, useFarms, useMasterChefV1SushiPerBlock, useSushiPrice } from 'app/services/graph'
import { useCallback, useMemo } from 'react'

// TODO: make farm id in args dynamic
export default function useStakingAPY({ chainId = ChainId.ETHEREUM, farmId = '8' }) {
  const farms = useFarms({ chainId })
  const exofiFarm = farms.filter((farm) => {
    // @ts-ignore TYPE NEEDS FIXING
    return farm.id === farmId && farm.chef === 1
  })
  const { data: averageBlockTime } = useAverageBlockTime({ chainId })

  const { data: masterChefV1SushiPerBlock } = useMasterChefV1SushiPerBlock()

  const { data: sushiPrice } = useSushiPrice()

  const blocksPerDay = 86400 / Number(averageBlockTime)
  // @ts-ignore TYPE NEEDS FIXING
  const map = useCallback(
    // @ts-ignore TYPE NEEDS FIXING
    (pool) => {
      const blocksPerHour = 3600 / averageBlockTime

      function getRewards() {
        const sushiPerBlock = masterChefV1SushiPerBlock

        // @ts-ignore TYPE NEEDS FIXING
        const rewardPerBlock = (pool.allocPoint / pool.magneticFieldGenerator.totalAllocPoint) * sushiPerBlock

        const defaultReward = {
          currency: SUSHI[ChainId.ETHEREUM],
          rewardPerBlock,
          rewardPerDay: rewardPerBlock * blocksPerDay,
          rewardPrice: sushiPrice,
        }

        let rewards: { currency: Currency; rewardPerBlock: number; rewardPerDay: number; rewardPrice: number }[] = [
          // @ts-ignore TYPE NEEDS FIXING
          defaultReward,
        ]

        return rewards
      }

      const rewards = getRewards()
      const totalStaked = Number(pool.slpBalance / 1e18)
      const tvl = totalStaked * sushiPrice

      const roiPerBlock =
        rewards.reduce((previousValue, currentValue) => {
          return previousValue + currentValue.rewardPerBlock * currentValue.rewardPrice
        }, 0) / tvl

      const rewardAprPerHour = roiPerBlock * blocksPerHour
      const rewardAprPerDay = rewardAprPerHour * 24
      const rewardAprPerMonth = rewardAprPerDay * 30
      const rewardAprPerYear = rewardAprPerMonth * 12
      return {
        rewardAprPerHour,
        rewardAprPerDay,
        rewardAprPerMonth,
        rewardAprPerYear,
        roiPerBlock,
        rewards,
        totalStaked,
        tvl,
      }
    },
    [averageBlockTime, blocksPerDay, masterChefV1SushiPerBlock, sushiPrice]
  )
  return useMemo(() => exofiFarm.map(map), [exofiFarm, map])
}
