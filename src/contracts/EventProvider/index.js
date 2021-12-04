import React, { useEffect } from 'react'
import { ethers } from 'ethers'
import { listenTransfers, readNFTDetails } from 'contracts/GolfClub'
import { listenMarketplace } from 'contracts/Marketplace'
import useGolfClubCollection from 'hooks/useGolfClubCollection'
import useListedNFTs from 'hooks/useListedNFTs'
import { useAccountState } from 'store/account/state'
import { listenBalance } from 'contracts/Balance'
import { provider } from 'constants/provider'
import useCallbackPopups from 'hooks/useCallbackPopups'
import { TRANSFER_NFT } from 'store/application/types'
import GolfClubNFTCard from 'components/GolfClubNFTCard'
import useClaimOwnerBalance from 'hooks/useClaimOwnerBalance'
import { listenRoulletReward } from 'contracts/Gameplay'
import useRouletteBalances from 'hooks/useRoulletBalances'
import { useRouletteState } from 'store/roulette/state'

const EventProvider = () => {
  const { isLoading, refreshCollection } = useGolfClubCollection({
    initialFetch: true,
  })
  const { isLoading: marketplaceLoading, refreshListings } = useListedNFTs({
    initialFetch: true,
  })
  const {
    isLoading: balanceLoading,
    startLoading,
    stopLoading,
    setBalance,
  } = useAccountState()
  const { refreshBalance: refreshClaimOwnerBalance } = useClaimOwnerBalance({
    initialFetch: true,
  })
  const { refreshBalance: refreshRoulletBalances } = useRouletteBalances({
    initialFetch: true,
  })
  const { toggleShowRoulette, setPrize, setReadyToClose } = useRouletteState()

  const { successPopup } = useCallbackPopups()

  async function mintEvent({ _tokenId, isMint }) {
    if (!isMint) {
      const golfClub = await readNFTDetails(_tokenId)
      successPopup(
        TRANSFER_NFT,
        <div style={{ width: '280px' }}>
          <h3 style={{ marginBottom: '20px' }}>New NFT received</h3>
          <GolfClubNFTCard golfClub={golfClub} />
          <br />
        </div>,
      )
    }
    if (!isLoading) refreshCollection()
  }

  function marketplaceUpdateEvent({ isMine }) {
    if (!marketplaceLoading) {
      refreshListings()
      if (isMine) refreshClaimOwnerBalance()
    }
  }

  function roulletRewardEvent({ _prizeId }) {
    setTimeout(() => {
      refreshRoulletBalances()

      setPrize(_prizeId)
      toggleShowRoulette(true)

      setTimeout(() => {
        setTimeout(() => {
          setReadyToClose(true)
        }, [5000])
        setPrize(_prizeId)
      }, [1000])
    }, [1000])
  }

  async function balanceUpdateEvent({ address }) {
    if (!balanceLoading) {
      startLoading()
      const newBalance = await provider.getBalance(address)
      setBalance(ethers.utils.formatEther(newBalance))
    }
    stopLoading(false)
  }

  useEffect(() => {
    listenTransfers(mintEvent)
    listenMarketplace(marketplaceUpdateEvent)
    listenBalance(balanceUpdateEvent)
    listenRoulletReward(roulletRewardEvent)
    // eslint-disable-next-line
  }, [])

  return null
}

export default EventProvider
