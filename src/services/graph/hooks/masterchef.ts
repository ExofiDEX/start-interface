import { ChainId } from '@exoda/core-sdk'
import { Chef } from 'app/features/onsen/enum'
import {
  getMasterChefV1Farms,
  getMasterChefV1PairAddreses,
  getMasterChefV1SushiPerBlock,
  getMasterChefV1TotalAllocPoint,
  getMasterChefV2Farms,
  getMasterChefV2PairAddreses,
  getMiniChefFarms,
  getMiniChefPairAddreses,
  getOldMiniChefFarms,
  getUserPools,
} from 'app/services/graph/fetchers'
import { useActiveWeb3React } from 'app/services/web3'
import stringify from 'fast-json-stable-stringify'
import concat from 'lodash/concat'
import { useMemo } from 'react'
import useSWR, { SWRConfiguration } from 'swr'

import { GraphProps } from '../interfaces'

export function useMasterChefV1TotalAllocPoint(swrConfig = undefined) {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && (chainId === ChainId.ETHEREUM || chainId === ChainId.GÖRLI)
  return useSWR(shouldFetch ? 'masterChefV1TotalAllocPoint' : null, () => getMasterChefV1TotalAllocPoint(), swrConfig)
}

export function useMasterChefV1SushiPerBlock(swrConfig = undefined) {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && (chainId === ChainId.ETHEREUM || chainId === ChainId.GÖRLI)
  return useSWR(shouldFetch ? 'masterChefV1SushiPerBlock' : null, () => getMasterChefV1SushiPerBlock(), swrConfig)
}

interface useFarmsProps {
  chainId: number
  swrConfig?: SWRConfiguration
}

export function useMasterChefV1Farms({ chainId, swrConfig = undefined }: useFarmsProps) {
  const shouldFetch = chainId && (chainId === ChainId.ETHEREUM || chainId === ChainId.GÖRLI) // Fetch on GÖRLI too.
  const { data } = useSWR(
    shouldFetch ? ['masterChefV1Farms'] : null,
    () => getMasterChefV1Farms(chainId, undefined),
    swrConfig
  )
  return useMemo(() => {
    if (!data) return []
    // @ts-ignore TYPE NEEDS FIXING
    return data.map((data) => ({ ...data, chef: Chef.MASTERCHEF }))
  }, [data])
}

export function useMasterChefV2Farms({ chainId, swrConfig = undefined }: useFarmsProps) {
  const shouldFetch = chainId && (chainId === ChainId.ETHEREUM || chainId === ChainId.GÖRLI) // Fetch on GÖRLI too
  const { data } = useSWR(shouldFetch ? 'masterChefV2Farms' : null, () => getMasterChefV2Farms(chainId), swrConfig)
  return useMemo(() => {
    if (!data) return []
    // @ts-ignore TYPE NEEDS FIXING
    return data.map((data) => ({ ...data, chef: Chef.MASTERCHEF_V2 }))
  }, [data])
}

// @ts-ignore TYPE NEEDS FIXING
export function useOldMiniChefFarms(swrConfig: SWRConfiguration = undefined) {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && chainId === ChainId.CELO
  const { data } = useSWR(
    shouldFetch ? ['oldMiniChefFarms', chainId] : null,
    (_, chainId) => getOldMiniChefFarms(chainId),
    swrConfig
  )

  return useMemo(() => {
    if (!data) return []
    // @ts-ignore TYPE NEEDS FIXING
    return data.map((data) => ({ ...data, chef: Chef.OLD_FARMS }))
  }, [data])
}

export function useMiniChefFarms({ chainId, swrConfig = undefined }: useFarmsProps) {
  const shouldFetch =
    chainId &&
    [
      ChainId.MATIC,
      ChainId.XDAI,
      ChainId.HARMONY,
      ChainId.ARBITRUM,
      ChainId.CELO,
      ChainId.MOONRIVER,
      ChainId.FUSE,
      ChainId.FANTOM,
      ChainId.MOONBEAM,
    ].includes(chainId)
  const { data } = useSWR(
    shouldFetch ? ['miniChefFarms', chainId] : null,
    (_, chainId) => getMiniChefFarms(chainId),
    swrConfig
  )
  return useMemo(() => {
    if (!data) return []
    // @ts-ignore TYPE NEEDS FIXING
    return data.map((data) => ({ ...data, chef: Chef.MINICHEF }))
  }, [data])
}

export function useFarms({ chainId, swrConfig = undefined }: useFarmsProps) {
  const masterChefV1Farms = useMasterChefV1Farms({ chainId })
  const masterChefV2Farms = useMasterChefV2Farms({ chainId })
  const miniChefFarms = useMiniChefFarms({ chainId })
  const oldMiniChefFarms = useOldMiniChefFarms()
  return useMemo(
    () =>
      concat(masterChefV1Farms, masterChefV2Farms, miniChefFarms, oldMiniChefFarms).filter((pool) => pool && pool.pair),
    [masterChefV1Farms, masterChefV2Farms, miniChefFarms, oldMiniChefFarms]
  )
}

export function useMasterChefV1PairAddresses() {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && (chainId === ChainId.ETHEREUM || chainId === ChainId.GÖRLI)
  return useSWR(shouldFetch ? ['masterChefV1PairAddresses', chainId] : null, (_) => getMasterChefV1PairAddreses())
}

export function useMasterChefV2PairAddresses() {
  const { chainId } = useActiveWeb3React()
  const shouldFetch = chainId && (chainId === ChainId.ETHEREUM || chainId === ChainId.GÖRLI)
  return useSWR(shouldFetch ? ['masterChefV2PairAddresses', chainId] : null, (_) => getMasterChefV2PairAddreses())
}

export function useUserPools({
  chainId = ChainId.ETHEREUM,
  variables,
  shouldFetch = true,
  swrConfig = undefined,
}: GraphProps) {
  const { data } = useSWR(
    shouldFetch ? ['userPools', chainId, stringify(variables)] : null,
    // @ts-ignore TYPE NEEDS FIXING
    () => getUserPools(chainId, variables),
    swrConfig
  )
  return useMemo(() => {
    if (!data) return []
    // @ts-ignore TYPE NEEDS FIXING
    return data.map((data) => data?.id)
  }, [data])
}

export function useMiniChefPairAddresses() {
  const { chainId } = useActiveWeb3React()
  const shouldFetch =
    chainId &&
    [
      ChainId.MATIC,
      ChainId.XDAI,
      ChainId.HARMONY,
      ChainId.ARBITRUM,
      ChainId.CELO,
      ChainId.MOONRIVER,
      ChainId.FUSE,
      ChainId.FANTOM,
    ].includes(chainId)
  return useSWR(shouldFetch ? ['miniChefPairAddresses', chainId] : null, (_, chainId) =>
    getMiniChefPairAddreses(chainId)
  )
}

export function useFarmPairAddresses() {
  const { data: masterChefV1PairAddresses } = useMasterChefV1PairAddresses()
  const { data: masterChefV2PairAddresses } = useMasterChefV2PairAddresses()
  const { data: miniChefPairAddresses } = useMiniChefPairAddresses()
  return useMemo(
    () => concat(masterChefV1PairAddresses ?? [], masterChefV2PairAddresses ?? [], miniChefPairAddresses ?? []),
    [masterChefV1PairAddresses, masterChefV2PairAddresses, miniChefPairAddresses]
  )
}
