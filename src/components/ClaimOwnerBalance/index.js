import React from 'react'
import { Flex } from 'rebass'
import { ButtonPrimary } from 'components/Button'
import { claimOwnerBalance } from 'contracts/Marketplace'
import useCallbackPopups from 'hooks/useCallbackPopups'
import { MARKETPLACE_CLAIM_BALANCE } from 'store/application/types'
import useClaimOwnerBalance from 'hooks/useClaimOwnerBalance'

const ClaimOwnerBalance = () => {
  const { balance, refreshBalance } = useClaimOwnerBalance()

  const { waitingUser, onSendTx, successPopup, errorPopup } =
    useCallbackPopups()

  function handleClaimRewards() {
    waitingUser(MARKETPLACE_CLAIM_BALANCE)
    claimOwnerBalance({
      onSend: () => onSendTx(MARKETPLACE_CLAIM_BALANCE),
      onSuccess: () =>
        successPopup(
          MARKETPLACE_CLAIM_BALANCE,
          <div>
            <h3>Rewards added to your wallet</h3>
            <h4>All the claimed balance where sent to your wallet address.</h4>
          </div>,
          refreshBalance,
        ),
      onError: err =>
        errorPopup(
          MARKETPLACE_CLAIM_BALANCE,
          'Error trying to claim balance.',
          err,
        ),
    })
  }

  return (
    <Flex justifyContent="center" alignItems="center">
      <div>
        <div>
          <b>Marketplace balance: {balance}</b>
        </div>
      </div>
      <ButtonPrimary
        style={{ margin: '0px 15px', padding: '2px 15px', width: 'auto' }}
        disabled={balance <= 0}
        onClick={handleClaimRewards}
      >
        Claim
      </ButtonPrimary>
    </Flex>
  )
}

export default ClaimOwnerBalance
