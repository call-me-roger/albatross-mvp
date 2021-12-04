import React from 'react'
import { Flex } from 'rebass'
import Slider from 'react-slick'
import styled, { keyframes } from 'styled-components'
import { ButtonPrimary } from 'components/Button'
import ClaimRewards from 'components/ClaimRewards'
import SimpleLoader from 'components/SimpleLoader'
import {
  findGame,
  getTournamentNumberByRoundIndex,
  playGame,
} from 'contracts/Gameplay'
import { getPerkByType } from 'contracts/GolfClub'
import { getGameSceneImage } from 'constants/game'
import { useApplicationState } from 'store/application/state'
import { FIND_TOURNAMENT, START_GAME } from 'store/application/types'
import useTournaments from 'hooks/useTournaments'
import useCallbackPopups from 'hooks/useCallbackPopups'

const Game = styled.div`
  width: 90vw;

  .flex-container {
    background-color: ${({ neverLoaded, theme }) =>
      neverLoaded ? theme.bg2 : 'transparent'};
  }
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
  refreshCollection,
}) => {
  const {
    rounds,
    displayRound,
    currentRound,
    isLoading,
    neverLoaded,
    startLoading,
    stopLoading,
    refreshRounds,
    setDisplayRound,
    sliderRef,
  } = useTournaments({ initialFetch: true })
  const { openPopup, closePopup } = useApplicationState()
  const { waitingUser, onSendTx, errorPopup } = useCallbackPopups()

  async function handlePlayGame(_golfClubId) {
    if (_golfClubId) {
      startLoading()
      waitingUser(START_GAME)
      await playGame(_golfClubId, {
        onSend: () => onSendTx(START_GAME),
        onError: err => {
          errorPopup(START_GAME, 'Error trying to play the game!', err)
          stopLoading()
        },
        onSuccess: () => {
          closePopup(START_GAME)
          refreshRounds()
        },
      })
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
    centerMode: false,
    centerPadding: '0px',
  }
  const currentTournament = getTournamentNumberByRoundIndex(displayRound)
  const noRounds = !neverLoaded && rounds.length === 0

  return (
    <Flex justifyContent="center">
      <Game neverLoaded={neverLoaded}>
        <Flex justifyContent="space-between" alignItems="center">
          <div>
            {noRounds ? (
              <h1>Find your first tournament</h1>
            ) : (
              <h1>Tournament #{currentTournament}</h1>
            )}
          </div>
          {!noRounds ? <ClaimRewards /> : null}
          <ButtonPrimary
            style={{ width: '200px', height: '40px' }}
            onClick={handleFindTournament}
          >
            Find new tournament
          </ButtonPrimary>
        </Flex>
        <Flex
          style={{
            minHeight: '350px',
            minWidth: '100%',
            borderRadius: '15px',
          }}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          className="flex-container"
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
              ref={ref => (sliderRef.current = ref)}
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
