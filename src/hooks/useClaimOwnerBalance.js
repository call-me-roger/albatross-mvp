import { useEffect } from 'react'
import { getClaimOwnerBalance } from 'contracts/Marketplace'
import { useMarketplaceState } from 'store/marketplace/state'

const useClaimOwnerBalance = props => {
  const { initialFetch = false } = props || {}
  const { balance, setBalance } = useMarketplaceState()

  async function refreshBalance() {
    const resultClaimBalance = await getClaimOwnerBalance()
    setBalance(resultClaimBalance)
  }

  useEffect(() => {
    if (initialFetch) refreshBalance()
    // eslint-disable-next-line
  }, [])

  return { balance, refreshBalance }
}

export default useClaimOwnerBalance
