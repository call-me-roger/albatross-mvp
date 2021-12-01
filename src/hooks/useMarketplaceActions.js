import React from 'react'

import SimpleLoader from 'components/SimpleLoader'
import { buyNFT, cancelListing } from 'contracts/Marketplace'
import { useApplicationState } from 'store/application/state'
import { MARKETPLACE_BUY, MARKETPLACE_CANCEL } from 'store/application/types'
import { ButtonPrimary } from 'components/Button'

const useMarketplaceActions = () => {
  const { openPopup, closePopup } = useApplicationState()

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

  function buyError(err, callback) {
    if (typeof callback === 'function') callback()
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

  function onSuccessBuy(callback) {
    if (typeof callback === 'function') callback()
    openPopup(MARKETPLACE_BUY, () => (
      <div align="center">
        <h3>NFT added to your collection!</h3>
        <ButtonPrimary onClick={() => closePopup(MARKETPLACE_BUY)}>
          Continue...
        </ButtonPrimary>
      </div>
    ))
  }

  async function handleBuyNFT(_golfClubId, _price, refresh) {
    waitUser(MARKETPLACE_BUY)
    buyNFT(_golfClubId, _price, {
      onSend: () => txSent(MARKETPLACE_BUY),
      onSuccess: () => onSuccessBuy(refresh),
      onError: err => buyError(err, refresh),
    })
  }

  function onSuccessCancel(callback) {
    if (typeof callback === 'function') callback()
    openPopup(MARKETPLACE_CANCEL, () => (
      <div align="center">
        <h3>Listing canceled!</h3>
        <ButtonPrimary onClick={() => closePopup(MARKETPLACE_CANCEL)}>
          Continue...
        </ButtonPrimary>
      </div>
    ))
  }

  function cancelListinError(err, callback) {
    if (typeof callback === 'function') callback()
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

  function handleCancelListing(_golfClubId, refresh) {
    waitUser(MARKETPLACE_CANCEL)
    cancelListing(_golfClubId, {
      onSend: () => txSent(MARKETPLACE_CANCEL),
      onSuccess: () => onSuccessCancel(refresh),
      onError: err => cancelListinError(err, refresh),
    })
  }

  return {
    handleBuyNFT,
    handleCancelListing,
  }
}

export default useMarketplaceActions
