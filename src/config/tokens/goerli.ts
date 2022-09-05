import { ChainId, Token } from '@exoda/core-sdk'

export const FERMION = new Token(ChainId.GÖRLI, '0x7d5e85d281CE6E93C6D17b4887e58242A23703c3', 18, 'EXOFI', 'Fermion')
export const DAI = new Token(ChainId.GÖRLI, '0xC10c9307022c8Ab914113b0d09e5d48E342dc80a', 18, 'DAI', 'Dai Stablecoin')
export const USDT = new Token(
  ChainId.GÖRLI,
  '0xE6E1aBcE0150fDb52d2fd84BcF354B9A2CC70E5e',
  18,
  'USDT',
  'Tether Stablecoin'
)
export const USDC = new Token(ChainId.GÖRLI, '0x3c8Bca4cEB2d32b7D49076688a06A635F84099e9', 18, 'USDC', 'USD Coin')
export const WETH = new Token(ChainId.GÖRLI, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH', 'Wrapped Ether')
