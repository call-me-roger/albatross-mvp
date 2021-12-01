import { useEffect } from 'react'
import { listenTransfers } from 'contracts/GolfClub'
import { listenMarketplace } from 'contracts/Marketplace'
import useGolfClubCollection from 'hooks/useGolfClubCollection'
import useListedNFTs from 'hooks/useListedNFTs'
import { useAccountState } from 'store/account/state'
import { listenBalance } from 'contracts/Balance'
import { provider } from 'constants/provider'

const EventProvider = ({ isListening }) => {
  const { isLoading, refreshCollection } = useGolfClubCollection({
    initialFetch: true,
  })
  const { isLoading: marketplaceLoading, refreshListings } = useListedNFTs({
    initialFetch: true,
  })
  const {
    isLoading: balanceLoading,
    setLoading: setLoadingBalance,
    setBalance,
  } = useAccountState()

  function _call(event) {
    if (isListening) event()
  }

  function mintEvent({ _tokenId, isMint }) {
    if (!isMint) console.log('Transfer received', { _tokenId })
    if (!isLoading) refreshCollection()
  }

  function marketplaceUpdateEvent() {
    if (!marketplaceLoading) refreshListings()
  }

  async function balanceUpdateEvent({ address }) {
    if (!balanceLoading) {
      setLoadingBalance(true)
      const newBalance = await provider.getBalance(address)
      setBalance(newBalance)
      setLoadingBalance(false)
    }
  }

  useEffect(() => {
    listenTransfers(_call(mintEvent))
    listenMarketplace(_call(marketplaceUpdateEvent))
    listenBalance(_call(balanceUpdateEvent))
    // eslint-disable-next-line
  }, [])

  return null
}

export default EventProvider
