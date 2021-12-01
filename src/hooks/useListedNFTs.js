import { useEffect, useState } from 'react'
import { getListedTokens } from 'contracts/Marketplace'
import { orderArrayByObjAttr } from 'utils/array/sort'
import useLoading from './useLoading'

const useListedNFTs = () => {
  const [listings, setListings] = useState([])
  const { isLoading, neverLoaded, startLoading, stopLoading } = useLoading()

  async function refreshListings() {
    startLoading()
    const newListings = await getListedTokens()
    if (newListings?.length > 0) {
      const ordered = orderArrayByObjAttr(newListings, 'nft', 'id', true)
      setListings(ordered)
    }
    stopLoading()
  }

  useEffect(() => {
    refreshListings()
    // eslint-disable-next-line
  }, [])

  return { listings, refreshListings, isLoading, neverLoaded }
}

export default useListedNFTs
