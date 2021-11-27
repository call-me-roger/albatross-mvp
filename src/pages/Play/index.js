import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SimpleGrid } from 'pages/Template/styles'
import {
  claimRewards,
  getClaimBalance,
  getCollection,
  listenRoundPlayed,
} from 'contracts/GolfClub'
import { ButtonPrimary } from 'components/Button'
import { orderArrayByObjAttr } from '../../utils/array/sort'
import SimpleLoader from 'components/SimpleLoader'
import { Flex } from 'rebass'
import GameSlider from 'components/GameSlider'
import useLoading from 'hooks/useLoading'
import NoGolfClubMessage from 'components/NoGolfClubMessage'
import CollectionSlider from 'components/CollectionSlider'
import { GAME_RESULT_LOSS, GAME_RESULT_VICTORY } from 'store/application/types'
import { useApplicationState } from 'store/application/state'
import { getGameResultImage } from 'constants/game'

const GameScene = styled.div`
  width: 700px;
  height: 700px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ image }) => `url(${image})`};
  background-size: cover;
  border-radius: 15px;

  h1 {
    font-family: 'Satisfy', cursive;
    padding: 20px;
    margin: 20px;
    color: #222;
    font-weight: bolder;
    font-size: 100px;
    text-shadow: 2px 2px 0 #000, 4px 4px 0 #fff;
  }

  .win {
    color: #f7cb00;
  }

  .loss {
    color: #e74d4d;
  }
`

const Play = () => {
  const [claimBalance, setClaimBalance] = useState(0)
  const [collection, setCollection] = useState([])
  const [selectedGolfClub, setSelectedGolfClub] = useState(null)
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { openPopup, closePopup } = useApplicationState()

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

  function roundResultEffect(result) {
    const { _matchResult } = result
    if (_matchResult === 1) {
      openPopup(GAME_RESULT_VICTORY, () => (
        <GameScene image={getGameResultImage('win')}>
          <h1 className="title win">You Win!</h1>
          <h2>+0.015 DRC added to your rewards</h2>
          <ButtonPrimary
            onClick={() => closePopup(GAME_RESULT_VICTORY)}
            style={{ width: '150px' }}
          >
            Continue...
          </ButtonPrimary>
        </GameScene>
      ))
    } else {
      openPopup(GAME_RESULT_LOSS, () => (
        <GameScene image={getGameResultImage('loss')}>
          <h1 className="title loss">You Missed!</h1>
          <ButtonPrimary
            onClick={() => closePopup(GAME_RESULT_LOSS)}
            style={{ width: '150px' }}
          >
            Continue...
          </ButtonPrimary>
        </GameScene>
      ))
    }
  }

  useEffect(() => {
    refreshCollection()
    listenRoundPlayed(roundResultEffect)
    // eslint-disable-next-line
  }, [])

  function handleClaimRewards() {
    claimRewards(refreshCollection)
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
        <NoGolfClubMessage isLoading={isLoading} collection={collection} />
      </center>
      <GameSlider
        selectedGolfClub={selectedGolfClub}
        resetSelectedGolfClub={() => setSelectedGolfClub(null)}
        refreshCollection={refreshCollection}
      />
      <CollectionSlider
        collection={collection}
        isLoading={isLoading}
        onClick={golfClubId => setSelectedGolfClub(golfClubId)}
        selectedGolfClub={selectedGolfClub}
      />
    </SimpleGrid>
  )
}

export default Play
