import SimpleLoader from 'components/SimpleLoader'
import {
  findGame,
  getRounds,
  getTournamentNumberByRoundIndex,
  playGame,
} from 'contracts/Gameplay'
import { getPerkByType } from 'contracts/GolfClub'
import useLoading from 'hooks/useLoading'
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Slider from 'react-slick'
import { getGameSceneImage } from 'constants/game'
import { Flex } from 'rebass'
import { ButtonPrimary } from 'components/Button'
import ClaimRewards from 'components/ClaimRewards'
import { useApplicationState } from 'store/application/state'
import { FIND_TOURNAMENT, START_GAME } from 'store/application/types'

const Game = styled.div`
  width: 90vw;
`

const SliderWrapper = styled.div`
  width: 100%;
`

const Scene = styled.div`
  padding: 15px;
  .card {
    width: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    margin: 20px !important;

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
      background-repeat: no-repeat;
    }

    .number {
      position: absolute;
      top: 15px;
      right: 30px;
      background-color: #000;
      color: #fff;
      font-size: 18px;
      border-radius: 50%;
      width: 40px;
      line-height: 40px;
      height: 40px;
      text-align: center;
      box-shadow: 2px 2px 3px 1px #111;
    }

    .victory {
      background-color: #00b900;
    }

    .current {
      background-color: #f0f0f0;
      color: #111;
    }

    .bottom-details {
      position: absolute;
      width: 100%;
      left: 0px;
      bottom: 0px;
      padding: 15px;
      background-color: rgba(0, 0, 0, 0.5);
      text-align: center;
    }
  }
`

const growAndShrink = keyframes`
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const GameButton = styled.button`
  background-color: ${({ disabled }) => (disabled ? '#333' : '#00a32e')};
  color: #fff;
  font-weight: 500;
  padding: 10px;
  font-family: 'Satisfy', cursive;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  min-width: 100px;
  animation: 2s ${growAndShrink} linear infinite;
`

function getPlayButton(selected, onClick, isLoading) {
  if (isLoading)
    return (
      <GameButton disabled>
        <SimpleLoader />
      </GameButton>
    )
  if (selected) {
    return <GameButton onClick={onClick}>Play!</GameButton>
  }

  return <GameButton disabled>Select a Golf Club!</GameButton>
}

const GameSlider = ({
  selectedGolfClubId,
  selectedGolfClub,
  resetSelectedGolfClubId,
  refreshCollection,
}) => {
  const [rounds, setRounds] = useState([])
  const [displayRound, setDisplayRound] = useState(null)
  const [currentRound, setCurrentRound] = useState(null)
  const { isLoading, neverLoaded, startLoading, stopLoading } = useLoading()
  const { openPopup, closePopup } = useApplicationState()
  const slider = useRef(null)

  function updateCurrentRound(newIndex) {
    const sliderApi = slider.current
    if (sliderApi?.slickGoTo) sliderApi.slickGoTo(newIndex)
    setCurrentRound(newIndex)
    setDisplayRound(newIndex)
  }

  async function refreshRounds() {
    startLoading()
    const { rounds: newRounds, currentRoundIndex } = await getRounds()
    setRounds(newRounds)
    updateCurrentRound(currentRoundIndex)

    stopLoading()
  }

  useEffect(() => {
    refreshRounds()
    // eslint-disable-next-line
  }, [])

  async function playGameEffect() {
    openPopup(START_GAME, () => (
      <div align="center">
        <h3>Transaction sent. </h3>
        <h4>Waiting block confirmations...</h4>
        <SimpleLoader />
      </div>
    ))
  }

  async function playGameError(tryAgain) {
    openPopup(START_GAME, () => (
      <div align="center">
        <h3>Something unexpected happened!</h3>
        <h4>You can try again...</h4>
        <ButtonPrimary onClick={tryAgain}>Play again!</ButtonPrimary>
      </div>
    ))
  }

  async function handlePlayGame(_golfClubId) {
    function tryAgain() {
      closePopup(START_GAME)
      handlePlayGame(_golfClubId)
    }

    if (_golfClubId) {
      startLoading()
      await playGame(_golfClubId, {
        onSend: playGameEffect,
        onError: () => playGameError(tryAgain),
        onSuccess: () => closePopup(START_GAME),
      })
      resetSelectedGolfClubId()
      refreshCollection()
      refreshRounds()
      stopLoading()
    }
  }

  function afterTournamentFound() {
    openPopup(FIND_TOURNAMENT, () => (
      <div>
        <h1>Tournament found!</h1>
        <ButtonPrimary
          onClick={() => closePopup(FIND_TOURNAMENT)}
          style={{ width: '150px' }}
        >
          Continue...
        </ButtonPrimary>
      </div>
    ))

    refreshCollection()
    refreshRounds()
  }

  function handleFindTournament() {
    openPopup(FIND_TOURNAMENT, () => (
      <div align="center">
        <h3>Waiting user to approve the transaction...</h3>
        <SimpleLoader />
      </div>
    ))

    findGame({
      onSend: () =>
        openPopup(FIND_TOURNAMENT, () => (
          <div align="center">
            <h3>Transaction sent. </h3>
            <h4>Waiting block confirmations...</h4>
            <SimpleLoader />
          </div>
        )),
      onSuccess: afterTournamentFound,
      onError: () =>
        openPopup(FIND_TOURNAMENT, () => (
          <div>
            <h3>Error trying to find tournament!</h3>
            <ButtonPrimary
              onClick={() => closePopup(FIND_TOURNAMENT)}
              style={{ width: '150px' }}
            >
              Continue...
            </ButtonPrimary>
          </div>
        )),
    })
  }

  function afterChangeSlide(_roundIndex) {
    setDisplayRound(_roundIndex)
  }

  const settings = {
    dots: true,
    infinite: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  }
  const currentTournament = getTournamentNumberByRoundIndex(displayRound)
  const noRounds = !neverLoaded && rounds.length === 0

  return (
    <Flex justifyContent="center">
      <Game>
        <Flex justifyContent="space-between" alignItems="center">
          <div>
            {noRounds ? (
              <h1>Find your first tournament</h1>
            ) : (
              <h1>Tournament #{currentTournament}</h1>
            )}
          </div>
          {!noRounds ? (
            <ClaimRewards refreshCollection={refreshCollection} />
          ) : null}
          <ButtonPrimary
            style={{ width: '200px', height: '40px' }}
            onClick={handleFindTournament}
          >
            Find new tournament
          </ButtonPrimary>
        </Flex>
        <Flex
          style={{
            backgroundColor: neverLoaded ? '#333' : 'transparent',
            minHeight: '350px',
            minWidth: '100%',
            borderRadius: '15px',
          }}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          {isLoading && (
            <div align="center">
              <h4>Loading tournaments...</h4>
              <SimpleLoader />
            </div>
          )}
          {noRounds && <h4>No tournaments yet.</h4>}
          <SliderWrapper>
            <Slider
              {...settings}
              ref={ref => (slider.current = ref)}
              afterChange={afterChangeSlide}
            >
              {rounds?.map((roundInfo, index) => {
                const bonusPerkType = getPerkByType(roundInfo.bonusPerkType)
                const isCurrentRound = currentRound === index
                const bonusActive =
                  isCurrentRound &&
                  selectedGolfClub?.playType === roundInfo.bonusPerkType

                return (
                  <Scene key={index}>
                    <div className="card">
                      <img
                        src={getGameSceneImage(roundInfo)}
                        alt={bonusPerkType}
                      />
                      <h3
                        className={`number ${roundInfo.victory && 'victory'} ${
                          isCurrentRound && 'current'
                        }`}
                      >
                        #{roundInfo.hole}
                      </h3>
                      <div className="bottom-details">
                        <h4>
                          {bonusPerkType}
                          {bonusActive && ' (+1% bonus)'}
                        </h4>
                        {isCurrentRound &&
                          getPlayButton(
                            selectedGolfClubId,
                            () => handlePlayGame(selectedGolfClubId),
                            isLoading,
                          )}
                        {roundInfo.victory && <h5>Victory</h5>}
                      </div>
                    </div>
                  </Scene>
                )
              })}
            </Slider>
          </SliderWrapper>
        </Flex>
      </Game>
    </Flex>
  )
}

export default GameSlider
