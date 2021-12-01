import { useEffect, useState } from 'react'
import { getCollection } from 'contracts/GolfClub'
import { isApprovedToSell } from 'contracts/Marketplace'
import { orderArrayByObjAttr } from 'utils/array/sort'
import { useCollectionState } from 'store/collection/state'

const useGolfClubCollection = props => {
  const { initialFetch = false } = props || {}

  const {
    collection,
    setCollection,
    isLoading,
    neverLoaded,
    startLoading,
    stopLoading,
  } = useCollectionState()
  const [isApproved, setApproved] = useState(false)

  async function refreshCollection() {
    if (!isLoading) {
      startLoading()
      const newCollection = await getCollection()
      if (newCollection?.length > 0) {
        const ordered = orderArrayByObjAttr(newCollection, 'id', null, true)
        setCollection(ordered)
      }
      stopLoading()
      if (!isApproved) {
        const approvedResult = await isApprovedToSell()
        if (approvedResult) setApproved(approvedResult)
      }
    }
  }

  useEffect(() => {
    if (initialFetch) refreshCollection()
    // eslint-disable-next-line
  }, [])

  return { collection, refreshCollection, isLoading, neverLoaded, isApproved }
}

export default useGolfClubCollection
