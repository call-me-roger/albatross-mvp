import React, { useEffect, useState } from 'react'
import { SimpleGrid } from 'pages/Template/styles'
import {
  claimRewards,
  findGame,
  getClaimBalance,
  getCollection,
} from 'contracts/GolfClub'
import { ButtonPrimary } from 'components/Button'
import { orderArrayByObjAttr } from '../../utils/array/sort'
import SimpleLoader from 'components/SimpleLoader'
import { Flex } from 'rebass'
import GameSlider from 'components/GameSlider'
import useLoading from 'hooks/useLoading'
import NoGolfClubMessage from 'components/NoGolfClubMessage'

const Play = () => {
  const [collection, setCollection] = useState([])
  const [claimBalance, setClaimBalance] = useState(0)
  const { isLoading, startLoading, stopLoading } = useLoading()

  async function refreshCollection() {
    startLoading()
    const newCollection = await getCollection()
    if (newCollection?.length > 0) {
      const ordered = orderArrayByObjAttr(newCollection, 'id', null, true)
      setCollection(ordered)
      const resultClaimBalance = await getClaimBalance()
      setClaimBalance(resultClaimBalance)
    }
    stopLoading()
  }

  useEffect(() => {
    refreshCollection()
    // eslint-disable-next-line
  }, [])

  function handleClaimRewards() {
    claimRewards(refreshCollection)
  }

  function handleFindGame() {
    findGame(refreshCollection)
  }

  return (
    <SimpleGrid>
      <center>
        <h1>Choose the best Golf Club to make a play!</h1>
        <Flex justifyContent="center" alignItems="center">
          <div>
            <b>Rewards: {claimBalance}</b>
          </div>
          <ButtonPrimary
            style={{ margin: '0px 15px', padding: '2px 15px', width: 'auto' }}
            disabled={claimBalance <= 0}
            onClick={handleClaimRewards}
          >
            Claim
          </ButtonPrimary>
        </Flex>
        {isLoading && <SimpleLoader />}
        {!isLoading && (
          <div>
            <br />
            {collection.length > 0 && (
              <ButtonPrimary
                style={{ width: '200px' }}
                onClick={handleFindGame}
              >
                Find new games
              </ButtonPrimary>
            )}
          </div>
        )}
        <NoGolfClubMessage isLoading={isLoading} collection={collection} />
      </center>
      <GameSlider />
    </SimpleGrid>
  )
}

export default Play
