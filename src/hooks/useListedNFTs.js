import { useEffect } from 'react'
import { getListedTokens } from 'contracts/Marketplace'
import { orderArrayByObjAttr } from 'utils/array/sort'
import { useMarketplaceState } from 'store/marketplace/state'

const useListedNFTs = props => {
  const { initialFetch = false, currentPage, pageLimit } = props || {}
  const {
    listings,
    setListings,
    isLoading,
    neverLoaded,
    startLoading,
    stopLoading,
  } = useMarketplaceState()

  async function refreshListings(page = null) {
    startLoading()
    const newPage = page ? page : currentPage
    const newListings = await getListedTokens(newPage, pageLimit)
    const ordered = orderArrayByObjAttr(newListings, 'nft', 'id', true)
    setListings(ordered)
    stopLoading()
  }

  useEffect(() => {
    if (initialFetch) refreshListings()
    // eslint-disable-next-line
  }, [])

  return { listings, refreshListings, isLoading, neverLoaded }
}

export default useListedNFTs
