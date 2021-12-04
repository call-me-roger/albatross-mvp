import React, { useEffect } from 'react'
import styled from 'styled-components'
import { SimpleGrid } from 'pages/Template/styles'
import SimpleLoader from 'components/SimpleLoader'
import NoGolfClubMessage from 'components/NoGolfClubMessage'
import ClaimOwnerBalance from 'components/ClaimOwnerBalance'
import GolfClubNFTInteractiveCard from 'components/GolfClubNFTInteractiveCard'
import { useHistory } from 'react-router'
import useListedNFTs from 'hooks/useListedNFTs'
import useMarketplaceActions from 'hooks/useMarketplaceActions'
import { useMarketplaceState } from 'store/marketplace/state'
import { Flex } from 'rebass'
import { ButtonPrimary } from 'components/Button'
import { getTotalPages } from 'contracts/Marketplace'

const Display = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`

const Marketplace = () => {
  const { currentPage, pageLimit, totalPages, setCurrentPage, setTotalPages } =
    useMarketplaceState()
  const { listings, isLoading, neverLoaded, refreshListings } = useListedNFTs({
    currentPage,
    pageLimit,
  })
  const { handleBuyNFT, handleCancelListing } = useMarketplaceActions()
  const history = useHistory()

  useEffect(() => {
    async function load() {
      const total = await getTotalPages(pageLimit)
      setTotalPages(total)
    }

    load()
    // eslint-disable-next-line
  }, [])

  function getPagination() {
    let items = []

    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <ButtonPrimary
          style={{ width: 'auto', padding: '5px 10px' }}
          disabled={i === currentPage || isLoading}
          onClick={() => {
            setCurrentPage(i)
            refreshListings(i)
          }}
        >
          {i}
        </ButtonPrimary>,
      )
    }

    return items.map((item, index) => <div key={index}>{item}</div>)
  }

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
      <center>{isLoading && !neverLoaded && <SimpleLoader />}</center>
      <Flex justifyContent="center" alignItems="center" style={{ gap: '5px' }}>
        {getPagination()}
      </Flex>
    </SimpleGrid>
  )
}

export default Marketplace
