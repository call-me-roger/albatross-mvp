import { Currency, ETHER, Token } from '@uniswap/sdk'

export function currencyId(currency) {
  if (currency === ETHER) return 'ETH'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
