import React, { useEffect } from 'react'
import { claimRewards, getClaimBalance } from 'contracts/Gameplay'
import { useApplicationState } from 'store/application/state'
import { useTournamentState } from 'store/tournaments/state'
import useCallbackPopups from './useCallbackPopups'
import { GAME_CLAIM_BALANCE } from 'store/application/types'

const useClaimRewards = props => {
  const { initialFetch } = props || {}

  const {
    balance,
    setBalance,
    isBalanceLoading,
    startBalanceLoading,
    stopBalanceLoading,
  } = useTournamentState()
  const { closePopup } = useApplicationState()
  const { waitingUser, onSendTx, errorPopup, successPopup } =
    useCallbackPopups()

  async function refreshRewards() {
    startBalanceLoading()
    const resultClaimBalance = await getClaimBalance()
    setBalance(resultClaimBalance)
    stopBalanceLoading()
  }

  useEffect(() => {
    if (initialFetch) refreshRewards()
    // eslint-disable-next-line
  }, [])

  function refreshRewardsAndCollection() {
    closePopup(GAME_CLAIM_BALANCE)
    refreshRewards()
  }

  function handleClaimRewards() {
    waitingUser(GAME_CLAIM_BALANCE)
    claimRewards({
      onSend: () => onSendTx(GAME_CLAIM_BALANCE),
      onSuccess: () =>
        successPopup(
          GAME_CLAIM_BALANCE,
          <div>
            <h3>Rewards added to your wallet</h3>
            <h4>All the claimed balance where sent to your wallet address.</h4>
          </div>,
          refreshRewardsAndCollection,
        ),
      onError: () =>
        errorPopup(
          GAME_CLAIM_BALANCE,
          'Error trying to claim balance.',
          refreshRewardsAndCollection,
        ),
    })
  }

  return {
    handleClaimRewards,
    balance,
    refreshRewards,
    isLoading: isBalanceLoading,
  }
}

export default useClaimRewards
