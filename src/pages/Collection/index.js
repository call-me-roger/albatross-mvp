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
import SellNFTModal from 'components/SellNFTModal'
import { useHistory } from 'react-router'
import { MARKETPLACE_SELL } from 'store/application/types'
import { sellNFT } from 'contracts/Marketplace'
import { useApplicationState } from 'store/application/state'
import { ButtonPrimary } from 'components/Button'

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

  function waitingUser() {
    openPopup(MARKETPLACE_SELL, () => (
      <div align="center">
        <h3>Waiting user to approve the transaction...</h3>
        <SimpleLoader />
      </div>
    ))
  }

  function onSendTx() {
    openPopup(MARKETPLACE_SELL, () => (
      <div align="center">
        <h3>Transaction sent. </h3>
        <h4>Waiting block confirmations...</h4>
        <SimpleLoader />
      </div>
    ))
  }

  function nftListedEffect() {
    openPopup(MARKETPLACE_SELL, () => (
      <div align="center">
        <h3>NFT listed on the marketplace</h3>
        <ButtonPrimary onClick={() => closePopup(MARKETPLACE_SELL)}>
          Continue...
        </ButtonPrimary>
      </div>
    ))
  }

  function listingError(err) {
    openPopup(MARKETPLACE_SELL, () => (
      <div>
        <h3>Error trying to list NFT.</h3>
        <pre>{err?.data?.message}</pre>
        <ButtonPrimary
          onClick={() => {
            refreshCollection()
            closePopup(MARKETPLACE_SELL)
          }}
          style={{ width: '150px' }}
        >
          Reload
        </ButtonPrimary>
      </div>
    ))
  }

  function handleSellNFT(_golfClubId) {
    openPopup(MARKETPLACE_SELL, () => (
      <SellNFTModal
        onConfirm={_newPrice => {
          waitingUser()
          sellNFT(_golfClubId, _newPrice, {
            onSend: onSendTx,
            onSuccess: nftListedEffect,
            onError: listingError,
          })
        }}
        onCancel={() => closePopup(MARKETPLACE_SELL)}
      />
    ))
  }

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
              onClickButton={() => handleSellNFT(golfClub.id)}
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
