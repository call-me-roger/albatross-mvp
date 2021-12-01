import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SimpleGrid } from 'pages/Template/styles'
import { listenRoundPlayed } from 'contracts/Gameplay'
import { ButtonPrimary } from 'components/Button'
import GameSlider from 'components/GameSlider'
import NoGolfClubMessage from 'components/NoGolfClubMessage'
import CollectionSlider from 'components/CollectionSlider'
import { GAME_RESULT_LOSS, GAME_RESULT_VICTORY } from 'store/application/types'
import { useApplicationState } from 'store/application/state'
import { getGameResultImage } from 'constants/game'
import useGolfClubCollection from 'hooks/useGolfClubCollection'

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
  const [selectedGolfClubId, setSelectedGolfClubId] = useState(null)
  const { openPopup, closePopup } = useApplicationState()
  const { collection, refreshCollection, isLoading, neverLoaded } =
    useGolfClubCollection()

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

  function getGolfClubById(_golfClubId) {
    const filtered = collection.filter(
      ({ id }) => Number(id) === Number(_golfClubId),
    )

    if (filtered[0]) return filtered[0]
    return null
  }

  return (
    <SimpleGrid>
      <center>
        <h1>Play tournaments to earn DRC</h1>
        <NoGolfClubMessage isLoading={isLoading} collection={collection} />
      </center>
      <GameSlider
        selectedGolfClubId={selectedGolfClubId}
        selectedGolfClub={getGolfClubById(selectedGolfClubId)}
        resetSelectedGolfClubId={() => setSelectedGolfClubId(null)}
        refreshCollection={refreshCollection}
      />
      <CollectionSlider
        collection={collection}
        isLoading={isLoading}
        neverLoaded={neverLoaded}
        onClick={golfClubId => setSelectedGolfClubId(golfClubId)}
        selectedGolfClubId={selectedGolfClubId}
      />
    </SimpleGrid>
  )
}

export default Play
