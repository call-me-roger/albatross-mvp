import React from 'react'
import { Flex } from 'rebass'
import { ButtonPrimary } from 'components/Button'
import useClaimRewards from 'hooks/useClaimRewards'

const ClaimRewards = () => {
  const { balance, handleClaimRewards } = useClaimRewards({
    initialFetch: true,
  })

  return (
    <Flex justifyContent="center" alignItems="center">
      <div>
        <div>
          <b>Rewards: {balance}</b>
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

export default ClaimRewards
