import { useEffect } from 'react'
import { listenTransfers } from 'contracts/GolfClub'
import { listenMarketplace } from 'contracts/Marketplace'
import useGolfClubCollection from 'hooks/useGolfClubCollection'
import useListedNFTs from 'hooks/useListedNFTs'

const EventProvider = ({ isListening }) => {
  const { isLoading, refreshCollection } = useGolfClubCollection({
    initialFetch: true,
  })
  const { isLoading: marketplaceLoading, refreshListings } = useListedNFTs({
    initialFetch: true,
  })

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

  useEffect(() => {
    listenTransfers(_call(mintEvent))
    listenMarketplace(_call(marketplaceUpdateEvent))
    // eslint-disable-next-line
  }, [])

  return null
}

export default EventProvider
