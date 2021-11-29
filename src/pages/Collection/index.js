import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useLoading from 'hooks/useLoading'
import { SimpleGrid } from 'pages/Template/styles'
import SimpleLoader from 'components/SimpleLoader'
import NoGolfClubMessage from 'components/NoGolfClubMessage'
import GolfClubNFTInteractiveCard from 'components/GolfClubNFTInteractiveCard'
import { getCollection } from 'contracts/GolfClub'
import { orderArrayByObjAttr } from '../../utils/array/sort'
import ClaimRewards from 'components/ClaimRewards'
import { useHistory } from 'react-router'

const Display = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`

const Dashboard = () => {
  const [collection, setCollection] = useState([])
  const { isLoading, startLoading, stopLoading } = useLoading()
  const history = useHistory()

  async function refreshCollection() {
    startLoading()
    const newCollection = await getCollection()
    if (newCollection?.length > 0) {
      const ordered = orderArrayByObjAttr(newCollection, 'id', null, true)
      setCollection(ordered)
    }
    stopLoading()
  }

  useEffect(() => {
    refreshCollection()
    // eslint-disable-next-line
  }, [])

  return (
    <SimpleGrid>
      <center>
        <h1>Your Golf Club Collection</h1>
        <ClaimRewards refreshCollection={refreshCollection} />
        {isLoading && <SimpleLoader />}
        <NoGolfClubMessage
          isLoading={isLoading}
          collection={collection}
          onClick={() => history.push('/')}
        />
      </center>
      <Display>
        {collection.map(golfClub => {
          return (
            <GolfClubNFTInteractiveCard
              key={golfClub.id}
              golfClub={golfClub}
              onClickButton={() => alert('Cooming soon!')}
              buttonText="Transfer/Sell"
              width="15.6%"
            />
          )
        })}
      </Display>
    </SimpleGrid>
  )
}

export default Dashboard
