import React from 'react'
import styled from 'styled-components'
import { SimpleGrid } from 'pages/Template/styles'
import SimpleLoader from 'components/SimpleLoader'
import NoGolfClubMessage from 'components/NoGolfClubMessage'
import ClaimOwnerBalance from 'components/ClaimOwnerBalance'
import GolfClubNFTInteractiveCard from 'components/GolfClubNFTInteractiveCard'
import { useHistory } from 'react-router'
import useListedNFTs from 'hooks/useListedNFTs'
import useMarketplaceActions from 'hooks/useMarketplaceActions'

const Display = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`

const Marketplace = () => {
  const { listings, isLoading, refreshListings } = useListedNFTs()
  const { handleBuyNFT, handleCancelListing } = useMarketplaceActions()
  const history = useHistory()

  return (
    <SimpleGrid>
      <center>
        <h1>Marketplace</h1>
        <ClaimOwnerBalance />
        {isLoading && <SimpleLoader />}
        <NoGolfClubMessage
          isLoading={isLoading}
          collection={listings}
          text="0 GolfClubs listed to sale!"
          buttonText="Sell my NFTs"
          onClick={() => history.push('/collection')}
        />
      </center>
      <Display>
        {listings.map(({ nft: golfClub, listing, isMine }) => {
          return (
            <GolfClubNFTInteractiveCard
              key={golfClub.id}
              golfClub={golfClub}
              onClickButton={
                isMine
                  ? () => handleCancelListing(golfClub, refreshListings)
                  : () =>
                      handleBuyNFT(golfClub.id, listing.price, refreshListings)
              }
              price={`${listing.price} DRC`}
              buttonText={isMine ? 'Cancel listing' : 'Buy'}
              width="15.6%"
            />
          )
        })}
      </Display>
    </SimpleGrid>
  )
}

export default Marketplace
