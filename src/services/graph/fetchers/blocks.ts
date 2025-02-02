import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '@exoda/core-sdk'
import { BLOCKS_GRAPH_VERSION, GRAPH_HOST } from 'app/services/graph/constants'
import { blockQuery } from 'app/services/graph/queries'
import { request } from 'graphql-request'

export const BLOCKS = {
  [ChainId.ETHEREUM]: 'blocklytics/ethereum-blocks',
  [ChainId.GÖRLI]: '30494/blocks-goerli', // Enable Görli Testnet
  [ChainId.XDAI]: 'matthewlilley/xdai-blocks',
  [ChainId.MATIC]: 'matthewlilley/polygon-blocks',
  [ChainId.FANTOM]: 'matthewlilley/fantom-blocks',
  [ChainId.BSC]: 'matthewlilley/bsc-blocks',
  [ChainId.HARMONY]: 'sushiswap/harmony-blocks',
  [ChainId.AVALANCHE]: 'matthewlilley/avalanche-blocks',
  [ChainId.CELO]: 'ubeswap/celo-blocks',
  [ChainId.ARBITRUM]: 'sushiswap/arbitrum-blocks',
  [ChainId.OKEX]: 'okexchain-blocks/oec',
  [ChainId.HECO]: 'hecoblocks/heco',
  [ChainId.MOONRIVER]: 'sushiswap/moonriver-blocks',
  [ChainId.FUSE]: 'sushiswap/fuse-blocks',
  [ChainId.KOVAN]: 'blocklytics/kovan-blocks',
  [ChainId.MOONBEAM]: 'sushiswap/moonbeam-blocks',
}

// @ts-ignore TYPE NEEDS FIXING
const fetcher = async (chainId = ChainId.ETHEREUM, query, variables = undefined) => {
  // @ts-ignore TYPE NEEDS FIXING
  const ret = await request(
    // @ts-ignore TYPE NEEDS FIXING
    `${GRAPH_HOST[chainId ? chainId : ChainId.ETHEREUM]}/query/${BLOCKS[chainId ? chainId : ChainId.ETHEREUM]}/${
      // @ts-ignore TYPE NEEDS FIXING
      BLOCKS_GRAPH_VERSION[chainId ? chainId : ChainId.ETHEREUM]
    }`,
    query,
    variables
  )
  return ret
}

export const getBlock = async (chainId = ChainId.ETHEREUM) => {
  return (await getStatisticBlock(chainId)).lastBlockNumber
}
// This is a replacement for getBlocks, and getMassBlocks
// @ts-ignore TYPE NEEDS FIXING
export const getStatisticBlock = async (chainId = ChainId.ETHEREUM) => {
  const { statisticBlock } = await fetcher(chainId, blockQuery)
  return statisticBlock
}

// Grabs the last 1000 (a sample statistical) blocks and averages
// the time difference between them
export const getAverageBlockTime = async (chainId = ChainId.ETHEREUM) => {
  // console.log('getAverageBlockTime')
  const block = await getStatisticBlock(chainId)

  let ret: string = block.slidingBlockTimeMs
  ret = ret.substring(0, ret.length - 3) // to Seconds...
  return ret
}

export const ethFetcher =
  (library: Web3Provider) =>
  (...args: [any, ...any[]] | undefined[]) => {
    const [method, ...params] = args
    console.log(method, params)
    // @ts-ignore TYPE NEEDS FIXING
    return library[method](...params)
  }
