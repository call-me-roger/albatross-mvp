import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useLoading from 'hooks/useLoading'
import { SimpleGrid } from 'pages/Template/styles'
import SimpleLoader from 'components/SimpleLoader'
import NoGolfClubMessage from 'components/NoGolfClubMessage'
import { orderArrayByObjAttr } from '../../utils/array/sort'
import ClaimRewards from 'components/ClaimRewards'
import GolfClubNFTInteractiveCard from 'components/GolfClubNFTInteractiveCard'
import { buyNFT, cancelListing, getListedTokens } from 'contracts/Marketplace'
import { MARKETPLACE_BUY, MARKETPLACE_CANCEL } from 'store/application/types'
import { ButtonPrimary } from 'components/Button'
import { useApplicationState } from 'store/application/state'

const Display = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`

const Dashboard = () => {
  const [collection, setCollection] = useState([])
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { openPopup, closePopup } = useApplicationState()

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

  function txSent(TYPE) {
    openPopup(TYPE, () => (
      <div align="center">
        <h3>Transaction sent. </h3>
        <h4>Waiting block confirmations...</h4>
        <SimpleLoader />
      </div>
    ))
  }

  function waitUser(TYPE) {
    openPopup(TYPE, () => (
      <div align="center">
        <h3>Waiting user to approve the transaction...</h3>
        <SimpleLoader />
      </div>
    ))
  }

  function buyError(err) {
    refreshCollection()
    openPopup(MARKETPLACE_BUY, () => (
      <div align="center">
        <h3>Error trying to buy the NFT.</h3>
        <pre>{err?.data?.message}</pre>
        <ButtonPrimary onClick={() => closePopup(MARKETPLACE_BUY)}>
          Reload...
        </ButtonPrimary>
      </div>
    ))
  }

  function onSuccessBuy() {
    refreshCollection()
    openPopup(MARKETPLACE_BUY, () => (
      <div align="center">
        <h3>NFT added to your collection!</h3>
        <ButtonPrimary onClick={() => closePopup(MARKETPLACE_BUY)}>
          Continue...
        </ButtonPrimary>
      </div>
    ))
  }

  async function handleBuyNFT(_golfClubId, _price) {
    waitUser(MARKETPLACE_BUY)
    buyNFT(_golfClubId, _price, {
      onSend: () => txSent(MARKETPLACE_BUY),
      onSuccess: onSuccessBuy,
      onError: buyError,
    })
  }

  function onSuccessCancel() {
    refreshCollection()
    openPopup(MARKETPLACE_CANCEL, () => (
      <div align="center">
        <h3>Listing canceled!</h3>
        <ButtonPrimary onClick={() => closePopup(MARKETPLACE_CANCEL)}>
          Continue...
        </ButtonPrimary>
      </div>
    ))
  }

  function cancelListinError(err) {
    refreshCollection()
    openPopup(MARKETPLACE_CANCEL, () => (
      <div align="center">
        <h3>Error trying to cancel listing.</h3>
        <pre>{err?.data?.message}</pre>
        <ButtonPrimary onClick={() => closePopup(MARKETPLACE_CANCEL)}>
          Reload...
        </ButtonPrimary>
      </div>
    ))
  }

  function handleCancelListing(_golfClubId) {
    waitUser(MARKETPLACE_CANCEL)
    cancelListing(_golfClubId, {
      onSend: () => txSent(MARKETPLACE_CANCEL),
      onSuccess: onSuccessCancel,
      onError: cancelListinError,
    })
  }

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
        {collection.map(({ nft: golfClub, listing, isMine }) => {
          return (
            <GolfClubNFTInteractiveCard
              key={golfClub.id}
              golfClub={golfClub}
              onClickButton={
                isMine
                  ? () => handleCancelListing(golfClub.id)
                  : () => handleBuyNFT(golfClub.id, listing.price)
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

export default Dashboard
