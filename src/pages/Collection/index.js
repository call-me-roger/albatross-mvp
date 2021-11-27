import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import useLoading from 'hooks/useLoading'
import { SimpleGrid } from 'pages/Template/styles'
import { ButtonPrimary } from 'components/Button'
import SimpleLoader from 'components/SimpleLoader'
import NoGolfClubMessage from 'components/NoGolfClubMessage'
import GolfClubNFTCard from 'components/GolfClubNFTCard'
import {
  claimRewards,
  getClaimBalance,
  getCollection,
} from 'contracts/GolfClub'
import { orderArrayByObjAttr } from '../../utils/array/sort'

const Display = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`

const Dashboard = () => {
  const [collection, setCollection] = useState([])
  const [claimBalance, setClaimBalance] = useState(0)
  const { isLoading, startLoading, stopLoading } = useLoading()

  async function refreshCollection() {
    startLoading()
    const newCollection = await getCollection()
    if (newCollection?.length > 0) {
      const ordered = orderArrayByObjAttr(newCollection, 'id', null, true)
      setCollection(ordered)
      const resultClaimBalance = await getClaimBalance()
      setClaimBalance(resultClaimBalance)
    }
    stopLoading()
  }

  useEffect(() => {
    refreshCollection()
    // eslint-disable-next-line
  }, [])

  function handleClaimRewards() {
    claimRewards(refreshCollection)
  }

  return (
    <SimpleGrid>
      <center>
        <h1>Your Golf Club Collection</h1>
        <Flex justifyContent="center" alignItems="center">
          <div>
            <b>Rewards: {claimBalance}</b>
          </div>
          <ButtonPrimary
            style={{ margin: '0px 15px', padding: '2px 15px', width: 'auto' }}
            disabled={claimBalance <= 0}
            onClick={handleClaimRewards}
          >
            Claim
          </ButtonPrimary>
        </Flex>
        {isLoading && <SimpleLoader />}
        <NoGolfClubMessage isLoading={isLoading} collection={collection} />
      </center>
      <Display>
        {collection.map(golfClub => {
          return (
            <GolfClubNFTCard
              key={golfClub.id}
              golfClub={golfClub}
              onClick={() => alert('Cooming soon!')}
              buttonText="Transfer/Sell"
            />
          )
        })}
      </Display>
    </SimpleGrid>
  )
}

export default Dashboard
