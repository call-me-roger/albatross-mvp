import { ethers } from 'ethers'

export const provider = new ethers.providers.Web3Provider(
  window.ethereum,
  'any',
)

export const CHAIN_ID = '0x102D'

export const metamaskParams = [
  {
    chainId: CHAIN_ID,
    chainName: 'DRC: Testnet',
    rpcUrls: ['https://testnet.doric.network'],
  },
]
