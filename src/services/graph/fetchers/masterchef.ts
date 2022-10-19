import { ChainId, SUSHI_ADDRESS } from '@exoda/core-sdk'
import { API_KEY, GRAPH_HOST, MFG_GRAPH_VERSION } from 'app/services/graph/constants'
import { getTokenSubset } from 'app/services/graph/fetchers/exchange'
import {
  masterChefV1PairAddressesQuery,
  masterChefV1TotalAllocPointQuery,
  masterChefV2PairAddressesQuery,
  miniChefPairAddressesQuery,
  miniChefPoolsQuery,
  miniChefPoolsQueryV2,
  poolsQuery,
  poolsV2Query,
  userPoolsQuery,
} from 'app/services/graph/queries'
import { request } from 'graphql-request'

export const MINICHEF = {
  [ChainId.MATIC]: 'jiro-ono/minichef-staging-updates',
  [ChainId.XDAI]: 'sushiswap/xdai-minichef',
  [ChainId.HARMONY]: 'sushiswap/harmony-minichef',
  [ChainId.ARBITRUM]: 'jiro-ono/arbitrum-minichef-staging',
  [ChainId.CELO]: 'sushiswap/celo-minichef-v2',
  [ChainId.MOONRIVER]: 'sushiswap/moonriver-minichef',
  [ChainId.FUSE]: 'sushiswap/fuse-minichef',
  [ChainId.FANTOM]: 'sushiswap/fantom-minichef',
  [ChainId.MOONBEAM]: 'sushiswap/moonbeam-minichef',
}

export const OLD_MINICHEF = {
  [ChainId.CELO]: 'sushiswap/celo-minichef',
}

// @ts-ignore TYPE NEEDS FIXING
export const miniChef = async (query, chainId = ChainId.ETHEREUM, variables = undefined) =>
  // @ts-ignore TYPE NEEDS FIXING
  request(`${GRAPH_HOST[chainId]}/subgraphs/name/${MINICHEF[chainId]}`, query, variables)

// @ts-ignore TYPE NEEDS FIXING
export const oldMiniChef = async (query, chainId = ChainId.ETHEREUM) =>
  // @ts-ignore TYPE NEEDS FIXING
  request(`${GRAPH_HOST[chainId]}/subgraphs/name/${OLD_MINICHEF[chainId]}`, query)

export const MASTERCHEF_V2 = {
  [ChainId.ETHEREUM]: `api/${API_KEY}/subgraphs/id`,
  [ChainId.GÖRLI]: 'query/30494/mfg-goerli', // Enable Görli Testnet
}

// @ts-ignore TYPE NEEDS FIXING
export const masterChefV2 = async (query, chainId = ChainId.ETHEREUM, variables = undefined) =>
  // @ts-ignore TYPE NEEDS FIXING
  request(`${GRAPH_HOST[chainId]}/${MASTERCHEF_V2[chainId]}/${MFG_GRAPH_VERSION[chainId]}`, query, variables)

export const MASTERCHEF_V1 = {
  [ChainId.ETHEREUM]: `api/${API_KEY}/subgraphs/id`,
  [ChainId.GÖRLI]: 'query/30494/mfg-goerli', // Enable Görli Testnet
}

// @ts-ignore TYPE NEEDS FIXING
export const masterChefV1 = async (query, chainId = ChainId.ETHEREUM, variables = undefined) =>
  // @ts-ignore TYPE NEEDS FIXING
  request(`${GRAPH_HOST[chainId]}/${MASTERCHEF_V1[chainId]}/${MFG_GRAPH_VERSION[chainId]}`, query, variables)

export const getMasterChefV1TotalAllocPoint = async () => {
  const {
    masterChef: { totalAllocPoint },
  } = await masterChefV1(masterChefV1TotalAllocPointQuery)
  return totalAllocPoint
}

// Not available in the subgraph anymore
// TODO: Michael: The best fix would be to ask the MFG contract getFermionPerBlock() method.
export const getMasterChefV1SushiPerBlock = async () => {
  // const {
  //   masterChef: { sushiPerBlock },
  // } = await masterChefV1(masterChefV1SushiPerBlockQuery)
  // return sushiPerBlock / 1e18
  return 60 // Current value.
}

export const getMasterChefV1Farms = async (chainId = ChainId.ETHEREUM, variables = undefined) => {
  // Expand for use in Testnets
  const { pools } = await masterChefV1(poolsQuery, chainId, variables)
  return pools
}

export const getMasterChefV1PairAddreses = async () => {
  const { pools } = await masterChefV1(masterChefV1PairAddressesQuery)
  // @ts-ignore
  return pools?.map((pool) => pool.pair)
}

export const getMasterChefV2Farms = async (chainId = ChainId.ETHEREUM, variables = undefined) => {
  // Expand for use in Testnets
  const { pools } = await masterChefV2(poolsV2Query, chainId, variables)

  const tokens = await getTokenSubset(chainId, {
    // @ts-ignore TYPE NEEDS FIXING
    tokenAddresses: Array.from(pools.map((pool) => SUSHI_ADDRESS[chainId])), // There is only Fermion but doing this results in no result at all...but maybe V2 Farms not needed
  })

  // @ts-ignore TYPE NEEDS FIXING
  return pools.map((pool) => ({
    ...pool,
    rewardToken: {
      // @ts-ignore TYPE NEEDS FIXING
      ...tokens.find((token) => token.id === SUSHI_ADDRESS[chainId]), // There is only Fermion but doing this results in no result at all...but maybe V2 Farms not needed
    },
  }))
}

export const getMasterChefV2PairAddreses = async () => {
  const { pools } = await masterChefV2(masterChefV2PairAddressesQuery)
  // @ts-ignore
  return pools?.map((pool) => pool.pair)
}

export const getUserPools = async (chainId = ChainId.ETHEREUM, variables = undefined) => {
  const { users } = await masterChefV2(userPoolsQuery, chainId, variables)
  // @ts-ignore
  return users?.map((user) => user.pool)
}

export const getOldMiniChefFarms = async (chainId = ChainId.ETHEREUM) => {
  const { pools } = await oldMiniChef(miniChefPoolsQuery, chainId)
  return pools
}

export const getMiniChefFarms = async (chainId = ChainId.ETHEREUM, variables = undefined) => {
  const v2Query = chainId && [ChainId.MATIC, ChainId.ARBITRUM].includes(chainId)

  if (v2Query) {
    const { pools } = await miniChef(miniChefPoolsQueryV2, chainId, variables)
    const tokens = await getTokenSubset(chainId, {
      // @ts-ignore TYPE NEEDS FIXING
      tokenAddresses: Array.from(pools.map((pool) => SUSHI[chainId])), // There is only Fermion...
    })

    // @ts-ignore TYPE NEEDS FIXING
    return pools.map((pool) => ({
      ...pool,
      rewardToken: {
        // @ts-ignore TYPE NEEDS FIXING
        ...tokens.find((token) => token.id === SUSHI[chainId]), // There is only Fermion...
      },
    }))
  } else {
    const { pools } = await miniChef(miniChefPoolsQuery, chainId, variables)
    return pools
  }
}

export const getMiniChefPairAddreses = async (chainId = ChainId.ETHEREUM) => {
  console.debug('getMiniChefPairAddreses')
  const { pools } = await miniChef(miniChefPairAddressesQuery, chainId)
  // @ts-ignore
  return pools?.map((pool) => pool.pair)
}
