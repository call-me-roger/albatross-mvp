import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useLoading from 'hooks/useLoading'
import { SimpleGrid } from 'pages/Template/styles'
import SimpleLoader from 'components/SimpleLoader'
import NoGolfClubMessage from 'components/NoGolfClubMessage'
import GolfClubNFTInteractiveCard from 'components/GolfClubNFTInteractiveCard'
import { getCollection, transferNFT } from 'contracts/GolfClub'
import { orderArrayByObjAttr } from '../../utils/array/sort'
import ClaimRewards from 'components/ClaimRewards'
import SellNFTModal from 'components/SellNFTModal'
import { useHistory } from 'react-router'
import { MARKETPLACE_SELL, TRANSFER_NFT } from 'store/application/types'
import { sellNFT } from 'contracts/Marketplace'
import { useApplicationState } from 'store/application/state'
import { ButtonPrimary } from 'components/Button'
import TransferNFTModal from 'components/TransferNFTModal'
import { DollarSign, Send } from 'react-feather'

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

  function waitingUser(TYPE) {
    openPopup(TYPE, () => (
      <div align="center">
        <h3>Waiting user to approve the transaction...</h3>
        <SimpleLoader />
      </div>
    ))
  }

  function onSendTx(TYPE) {
    openPopup(TYPE, () => (
      <div align="center">
        <h3>Transaction sent. </h3>
        <h4>Waiting block confirmations...</h4>
        <SimpleLoader />
      </div>
    ))
  }

  function successPopup(TYPE, text) {
    refreshCollection()
    openPopup(TYPE, () => (
      <div align="center">
        <h3>{text}</h3>
        <ButtonPrimary onClick={() => closePopup(TYPE)}>
          Continue...
        </ButtonPrimary>
      </div>
    ))
  }

  function errorPopup(TYPE, errorText, err) {
    openPopup(TYPE, () => (
      <div>
        <h3>Error trying to list NFT.</h3>
        <pre>{err?.data?.message}</pre>
        <ButtonPrimary
          onClick={() => {
            refreshCollection()
            closePopup(TYPE)
          }}
          style={{ width: '150px' }}
        >
          Reload
        </ButtonPrimary>
      </div>
    ))
  }

  function handleSellNFT(_golfClub) {
    if (_golfClub?.id) {
      openPopup(MARKETPLACE_SELL, () => (
        <SellNFTModal
          onConfirm={_newPrice => {
            waitingUser(MARKETPLACE_SELL)
            sellNFT(_golfClub.id, _newPrice, {
              onSend: () => onSendTx(MARKETPLACE_SELL),
              onSuccess: () =>
                successPopup(MARKETPLACE_SELL, 'NFT listed on the marketplace'),
              onError: err =>
                errorPopup(MARKETPLACE_SELL, 'Error trying to list NFT.', err),
            })
          }}
          onCancel={() => closePopup(MARKETPLACE_SELL)}
          golfClub={_golfClub}
        />
      ))
    }
  }

  function handleTransferNFT(_golfClub) {
    if (_golfClub?.id) {
      openPopup(TRANSFER_NFT, () => (
        <TransferNFTModal
          onConfirm={_toAddress => {
            waitingUser(TRANSFER_NFT)
            transferNFT(_toAddress, _golfClub.id, {
              onSend: () => onSendTx(TRANSFER_NFT),
              onSuccess: () =>
                successPopup(
                  TRANSFER_NFT,
                  <>
                    NFT transfered to address: <br />
                    {_toAddress}
                  </>,
                ),
              onError: err =>
                errorPopup(TRANSFER_NFT, 'Error trying to transfer NFT.', err),
            })
          }}
          onCancel={() => closePopup(TRANSFER_NFT)}
          golfClub={_golfClub}
        />
      ))
    }
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
              onClickButton={() => handleSellNFT(golfClub)}
              onClickSecondaryButton={() => handleTransferNFT(golfClub)}
              secondaryButtonText={
                <>
                  <Send size="15px" style={{ marginRight: '5px' }} /> Transfer
                </>
              }
              buttonText={
                <>
                  <DollarSign size="15px" style={{ marginRight: '5px' }} /> Sell
                </>
              }
              width="15.6%"
            />
          )
        })}
      </Display>
    </SimpleGrid>
  )
}

export default Dashboard
