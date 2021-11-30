import { useEffect, useState } from 'react'
import { getCollection } from 'contracts/GolfClub'
import { isApprovedToSell } from 'contracts/Marketplace'
import { orderArrayByObjAttr } from 'utils/array/sort'
import useLoading from './useLoading'

const useGolfClubCollection = () => {
  const [collection, setCollection] = useState([])
  const [isApproved, setApproved] = useState(false)
  const { isLoading, neverLoaded, startLoading, stopLoading } = useLoading()

  async function refreshCollection() {
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

  useEffect(() => {
    refreshCollection()
    // eslint-disable-next-line
  }, [])

  return { collection, refreshCollection, isLoading, neverLoaded, isApproved }
}

export default useGolfClubCollection
