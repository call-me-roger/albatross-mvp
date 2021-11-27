import SimpleLoader from 'components/SimpleLoader'
import { getPerkByType, getRounds } from 'contracts/GolfClub'
import useLoading from 'hooks/useLoading'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { getGameSceneImage } from 'constants/game'

const Game = styled.div`
  width: 100vw;
  height: 60vh;
`

const Scene = styled.div`
  width: 100%;
  height: 60vh;

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
    background-repeat: no-repeat;
  }
`

const GameSlider = () => {
  const [rounds, setRounds] = useState([])
  const { isLoading, startLoading, stopLoading } = useLoading()

  async function refreshRounds() {
    startLoading()
    const newRounds = await getRounds()
    setRounds(newRounds)
    stopLoading()
  }

  useEffect(() => {
    refreshRounds()
    // eslint-disable-next-line
  }, [])

  const settings = {
    dots: true,
    infinite: false,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: rounds.length,
  }

  return (
    <Game>
      {isLoading && (
        <center>
          <SimpleLoader />
        </center>
      )}
      <Slider {...settings}>
        {rounds?.map((roundInfo, index) => {
          const bonusPerkType = getPerkByType(roundInfo.bonusPerkType)
          return (
            <Scene
              key={index}
              style={{
                width: '100px',
                padding: '15px',
                margin: '15px',
                backgroundColor: '#000',
              }}
            >
              <img src={getGameSceneImage(roundInfo)} alt={bonusPerkType} />
              <h3>{roundInfo.hole}</h3>
              <h4>{bonusPerkType}</h4>
              {roundInfo.victory && <h5>Victory</h5>}
            </Scene>
          )
        })}
      </Slider>
    </Game>
  )
}

export default GameSlider
