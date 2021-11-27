import SimpleLoader from 'components/SimpleLoader'
import {
  findGame,
  getPerkByType,
  getRounds,
  playGame,
} from 'contracts/GolfClub'
import useLoading from 'hooks/useLoading'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { getGameSceneImage } from 'constants/game'
import { Flex } from 'rebass'
import { ButtonPrimary } from 'components/Button'

const Game = styled.div`
  width: 90vw;
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
    }
  }
`

function getPlayButton(selected, onClick, isLoading) {
  if (isLoading) return <SimpleLoader />
  if (selected) {
    return (
      <ButtonPrimary className="play" onClick={onClick}>
        Play!
      </ButtonPrimary>
    )
  }

  return (
    <ButtonPrimary className="play" disabled>
      Select a Golf Club!
    </ButtonPrimary>
  )
}

const GameSlider = ({
  selectedGolfClub,
  resetSelectedGolfClub,
  refreshCollection,
}) => {
  const [rounds, setRounds] = useState([])
  const [currentRound, setCurrentRound] = useState(null)
  const { isLoading, startLoading, stopLoading } = useLoading()
  const slider = useRef(null)

  async function refreshRounds() {
    startLoading()
    const { rounds: newRounds, currentRoundIndex } = await getRounds()
    setRounds(newRounds)
    setCurrentRound(currentRoundIndex)
    const sliderApi = slider.current
    if (sliderApi?.slickGoTo) sliderApi.slickGoTo(currentRoundIndex)

    stopLoading()
  }

  useEffect(() => {
    refreshRounds()
    // eslint-disable-next-line
  }, [])

  async function handlePlayGame() {
    if (selectedGolfClub) {
      startLoading()
      await playGame(selectedGolfClub)
      resetSelectedGolfClub()
      refreshCollection()
      refreshRounds()
      stopLoading()
    }
  }

  const settings = {
    dots: true,
    infinite: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
  }

  function handleFindGame() {
    findGame(refreshCollection)
  }

  return (
    <Flex justifyContent="center">
      <Game>
        {!isLoading && (
          <div>
            <ButtonPrimary style={{ width: '200px' }} onClick={handleFindGame}>
              Find new tournment
            </ButtonPrimary>
          </div>
        )}
        {isLoading && (
          <center>
            <SimpleLoader />
          </center>
        )}
        <Slider {...settings} ref={ref => (slider.current = ref)}>
          {rounds?.map((roundInfo, index) => {
            const bonusPerkType = getPerkByType(roundInfo.bonusPerkType)
            const isCurrentRound = currentRound === index

            return (
              <Scene key={index}>
                <div className="card">
                  <img src={getGameSceneImage(roundInfo)} alt={bonusPerkType} />
                  <h3
                    className={`number ${roundInfo.victory && 'victory'} ${
                      isCurrentRound && 'current'
                    }`}
                  >
                    #{roundInfo.hole}
                  </h3>
                  <div className="bottom-details">
                    <h4>{bonusPerkType}</h4>
                    {isCurrentRound &&
                      getPlayButton(
                        selectedGolfClub,
                        handlePlayGame,
                        isLoading,
                      )}
                    {roundInfo.victory && <h5>Victory</h5>}
                  </div>
                </div>
              </Scene>
            )
          })}
        </Slider>
      </Game>
    </Flex>
  )
}

export default GameSlider
