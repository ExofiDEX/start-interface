import { ChainId } from '@exoda/core-sdk'

const THE_GRAPH = 'https://api.studio.thegraph.com'
const NAS_GRAPH = 'https://graph.kkt.one/node'
const HYPER_GRAPH = 'https://q.hg.network'
const DECENTRALISED_THE_GRAPH = ' https://gateway.thegraph.com'

export const API_KEY = 'adf126df88fb44b4c8138a659f3e3e9d'

export const GRAPH_HOST = {
  [ChainId.ETHEREUM]: DECENTRALISED_THE_GRAPH,
  [ChainId.GÖRLI]: THE_GRAPH, // Enable Görli Testnet
  [ChainId.XDAI]: THE_GRAPH,
  [ChainId.MATIC]: THE_GRAPH,
  [ChainId.FANTOM]: THE_GRAPH,
  [ChainId.BSC]: THE_GRAPH,
  [ChainId.AVALANCHE]: THE_GRAPH,
  [ChainId.CELO]: THE_GRAPH,
  [ChainId.ARBITRUM]: THE_GRAPH,
  [ChainId.HARMONY]: 'https://sushi.graph.t.hmny.io',
  [ChainId.OKEX]: HYPER_GRAPH,
  [ChainId.HECO]: HYPER_GRAPH,
  [ChainId.MOONRIVER]: THE_GRAPH,
  [ChainId.TELOS]: THE_GRAPH,
  [ChainId.KOVAN]: THE_GRAPH,
  [ChainId.FUSE]: THE_GRAPH,
  [ChainId.MOONBEAM]: THE_GRAPH,
  [ChainId.OPTIMISM]: THE_GRAPH,
}

export const TRIDENT = {
  [ChainId.MATIC]: 'matthewlilley/trident-polygon',
  [ChainId.KOVAN]: 'sushiswap/trident-kovan',
  [ChainId.OPTIMISM]: 'matthewlilley/trident-optimism',
}

export const EXCHANGE_GRAPH_VERSION = {
  [ChainId.ETHEREUM]: 'sAkaNrCAZmEGn87mJWXJKEmJX1vH2WibBv3AAWfCDdM',
  [ChainId.GÖRLI]: 'v0.1.1',
  [ChainId.XDAI]: 'v0.1.1',
  [ChainId.MATIC]: 'v0.1.1',
  [ChainId.FANTOM]: 'v0.1.1',
  [ChainId.BSC]: 'v0.1.1',
  [ChainId.HARMONY]: 'v0.1.1',
  [ChainId.AVALANCHE]: 'v0.1.1',
  [ChainId.CELO]: 'v0.1.1',
  [ChainId.ARBITRUM]: 'v0.1.1',
  [ChainId.OKEX]: 'v0.1.1',
  [ChainId.HECO]: 'v0.1.1',
  [ChainId.MOONRIVER]: 'v0.1.1',
  [ChainId.FUSE]: 'v0.1.1',
  [ChainId.KOVAN]: 'v0.1.1',
  [ChainId.MOONBEAM]: 'v0.1.1',
}

export const BLOCKS_GRAPH_VERSION = {
  [ChainId.ETHEREUM]: 'v0.1.1',
  [ChainId.GÖRLI]: 'v0.1.1',
  [ChainId.XDAI]: 'v0.1.1',
  [ChainId.MATIC]: 'v0.1.1',
  [ChainId.FANTOM]: 'v0.1.1',
  [ChainId.BSC]: 'v0.1.1',
  [ChainId.HARMONY]: 'v0.1.1',
  [ChainId.AVALANCHE]: 'v0.1.1',
  [ChainId.CELO]: 'v0.1.1',
  [ChainId.ARBITRUM]: 'v0.1.1',
  [ChainId.OKEX]: 'v0.1.1',
  [ChainId.HECO]: 'v0.1.1',
  [ChainId.MOONRIVER]: 'v0.1.1',
  [ChainId.FUSE]: 'v0.1.1',
  [ChainId.KOVAN]: 'v0.1.1',
  [ChainId.MOONBEAM]: 'v0.1.1',
}

export const MFG_GRAPH_VERSION = {
  [ChainId.ETHEREUM]: '8bq5qD26F78MAskLDEhtKGTU97eD4TM2CqjXjAzrXRi8',
  [ChainId.GÖRLI]: 'v0.1.1',
  [ChainId.XDAI]: 'v0.1.1',
  [ChainId.MATIC]: 'v0.1.1',
  [ChainId.FANTOM]: 'v0.1.1',
  [ChainId.BSC]: 'v0.1.1',
  [ChainId.HARMONY]: 'v0.1.1',
  [ChainId.AVALANCHE]: 'v0.1.1',
  [ChainId.CELO]: 'v0.1.1',
  [ChainId.ARBITRUM]: 'v0.1.1',
  [ChainId.OKEX]: 'v0.1.1',
  [ChainId.HECO]: 'v0.1.1',
  [ChainId.MOONRIVER]: 'v0.1.1',
  [ChainId.FUSE]: 'v0.1.1',
  [ChainId.KOVAN]: 'v0.1.1',
  [ChainId.MOONBEAM]: 'v0.1.1',
}

export const FERMION_GRAPH_VERSION = {
  [ChainId.ETHEREUM]: 'v0.1.1',
  [ChainId.GÖRLI]: 'v0.1.1',
  [ChainId.XDAI]: 'v0.1.1',
  [ChainId.MATIC]: 'v0.1.1',
  [ChainId.FANTOM]: 'v0.1.1',
  [ChainId.BSC]: 'v0.1.1',
  [ChainId.HARMONY]: 'v0.1.1',
  [ChainId.AVALANCHE]: 'v0.1.1',
  [ChainId.CELO]: 'v0.1.1',
  [ChainId.ARBITRUM]: 'v0.1.1',
  [ChainId.OKEX]: 'v0.1.1',
  [ChainId.HECO]: 'v0.1.1',
  [ChainId.MOONRIVER]: 'v0.1.1',
  [ChainId.FUSE]: 'v0.1.1',
  [ChainId.KOVAN]: 'v0.1.1',
  [ChainId.MOONBEAM]: 'v0.1.1',
}
