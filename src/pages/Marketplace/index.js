import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useLoading from 'hooks/useLoading'
import { SimpleGrid } from 'pages/Template/styles'
import SimpleLoader from 'components/SimpleLoader'
import NoGolfClubMessage from 'components/NoGolfClubMessage'
import { orderArrayByObjAttr } from '../../utils/array/sort'
import ClaimRewards from 'components/ClaimRewards'
import GolfClubNFTInteractiveCard from 'components/GolfClubNFTInteractiveCard'
import { getListedTokens } from 'contracts/Marketplace'

const Display = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`

const Dashboard = () => {
  const [collection, setCollection] = useState([])
  const { isLoading, startLoading, stopLoading } = useLoading()

  async function refreshCollection() {
    startLoading()
    const newCollection = await getListedTokens()
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
        <h1>Marketplace</h1>
        <ClaimRewards refreshCollection={refreshCollection} />
        {isLoading && <SimpleLoader />}
        <NoGolfClubMessage
          isLoading={isLoading}
          collection={collection}
          text="0 GolfClubs listed to sale!"
          buttonText="Sell my NFTs"
        />
      </center>
      <Display>
        {collection.map(({ nft: golfClub, listing }) => {
          return (
            <GolfClubNFTInteractiveCard
              key={golfClub.id}
              golfClub={golfClub}
              onClickButton={() => alert('Cooming soon!')}
              price={`${listing.price} DRC`}
              buttonText="Buy"
              width="15.6%"
            />
          )
        })}
      </Display>
    </SimpleGrid>
  )
}

export default Dashboard
