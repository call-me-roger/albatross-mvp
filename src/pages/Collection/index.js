import React from 'react'
import styled from 'styled-components'
import { SimpleGrid } from 'pages/Template/styles'
import SimpleLoader from 'components/SimpleLoader'
import NoGolfClubMessage from 'components/NoGolfClubMessage'
import GolfClubNFTInteractiveCard from 'components/GolfClubNFTInteractiveCard'
import { transferNFT } from 'contracts/GolfClub'
import ClaimRewards from 'components/ClaimRewards'
import SellNFTModal from 'components/SellNFTModal'
import { useHistory } from 'react-router'
import {
  MARKETPLACE_APPROVE,
  MARKETPLACE_SELL,
  TRANSFER_NFT,
} from 'store/application/types'
import { approveMarketplace, sellNFT } from 'contracts/Marketplace'
import { useApplicationState } from 'store/application/state'
import { ButtonPrimary } from 'components/Button'
import TransferNFTModal from 'components/TransferNFTModal'
import { DollarSign, Send } from 'react-feather'
import { Flex } from 'rebass'
import useCallbackPopups from 'hooks/useCallbackPopups'
import useGolfClubCollection from 'hooks/useGolfClubCollection'
import useMarketplaceActions from 'hooks/useMarketplaceActions'

const Display = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`

const Collection = () => {
  const { openPopup, closePopup } = useApplicationState()
  const { waitingUser, onSendTx, successPopup, errorPopup } =
    useCallbackPopups()
  const { collection, refreshCollection, isLoading, isApproved } =
    useGolfClubCollection()
  const { handleCancelListing } = useMarketplaceActions()
  const history = useHistory()

  function handleSellNFT(_golfClub) {
    if (_golfClub?.id) {
      openPopup(MARKETPLACE_SELL, () => (
        <SellNFTModal
          onConfirm={_newPrice => {
            waitingUser(MARKETPLACE_SELL)
            sellNFT(_golfClub.id, _newPrice, {
              onSend: () => onSendTx(MARKETPLACE_SELL),
              onSuccess: () =>
                successPopup(
                  MARKETPLACE_SELL,
                  <h3>NFT listed on the marketplace</h3>,
                  refreshCollection,
                ),
              onError: err =>
                errorPopup(
                  MARKETPLACE_SELL,
                  'Error trying to list NFT.',
                  err,
                  refreshCollection,
                ),
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
                    <h3>NFT transfered to address:</h3>
                    <h4>{_toAddress}</h4>
                  </>,
                  refreshCollection,
                ),
              onError: err =>
                errorPopup(
                  TRANSFER_NFT,
                  'Error trying to transfer NFT.',
                  err,
                  refreshCollection,
                ),
            })
          }}
          onCancel={() => closePopup(TRANSFER_NFT)}
          golfClub={_golfClub}
        />
      ))
    }
  }

  function handleApproveMarketplace() {
    waitingUser(MARKETPLACE_APPROVE)
    approveMarketplace({
      onSend: () => {
        onSendTx(MARKETPLACE_APPROVE)
      },
      onSuccess: () => {
        successPopup(
          MARKETPLACE_APPROVE,
          <div>
            <h3>Marketplace approved</h3>
            <p>Now you can sell your NFTs on the marketplace.</p>
          </div>,
          refreshCollection,
        )
      },
      onError: err => {
        errorPopup(
          MARKETPLACE_APPROVE,
          'Error trying to approve marketplace.',
          err,
          refreshCollection,
        )
      },
    })
  }

  return (
    <SimpleGrid>
      <center>
        <Flex justifyContent="space-between" alignItems="center">
          <h1 style={{ width: '33.3%' }}>Your Golf Club Collection</h1>
          <ClaimRewards refreshCollection={refreshCollection} />
          <div style={{ width: '33.3%' }}>
            {!isApproved && (
              <ButtonPrimary
                style={{ width: '200px', marginTop: '15px', padding: '5px' }}
                onClick={handleApproveMarketplace}
              >
                Approve marketplace
              </ButtonPrimary>
            )}
          </div>
        </Flex>
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
              onClickButton={
                golfClub.isListed
                  ? () => handleCancelListing(golfClub)
                  : () => handleSellNFT(golfClub)
              }
              onClickSecondaryButton={() => handleTransferNFT(golfClub)}
              secondaryButtonText={
                <>
                  <Send size="15px" style={{ marginRight: '5px' }} /> Transfer
                </>
              }
              buttonText={
                <font
                  title={
                    !isApproved && 'First approve the marketplace to sell NFTs.'
                  }
                >
                  {golfClub.isListed && 'Cancel listing'}
                  {!golfClub.isListed && (
                    <>
                      <DollarSign size="15px" style={{ marginRight: '5px' }} />{' '}
                      Sell
                    </>
                  )}
                </font>
              }
              blockPrimaryButton={!isApproved}
              width="15.6%"
            />
          )
        })}
      </Display>
    </SimpleGrid>
  )
}

export default Collection
