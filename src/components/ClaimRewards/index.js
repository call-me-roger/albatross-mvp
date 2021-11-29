import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import { ButtonPrimary } from 'components/Button'
import { claimRewards, getClaimBalance } from 'contracts/GolfClub'

const ClaimRewards = ({ refreshCollection }) => {
  const [claimBalance, setClaimBalance] = useState(0)

  useEffect(() => {
    async function start() {
      const resultClaimBalance = await getClaimBalance()
      setClaimBalance(resultClaimBalance)
    }
    start()
  }, [])

  function handleClaimRewards() {
    claimRewards(refreshCollection)
  }

  return (
    <Flex justifyContent="center" alignItems="center">
      <div>
        <div>
          <b>Rewards: {claimBalance}</b>
        </div>
      </div>
      <ButtonPrimary
        style={{ margin: '0px 15px', padding: '2px 15px', width: 'auto' }}
        disabled={claimBalance <= 0}
        onClick={handleClaimRewards}
      >
        Claim
      </ButtonPrimary>
    </Flex>
  )
}

export default ClaimRewards
