import SimpleLoader from 'components/SimpleLoader'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { Flex } from 'rebass'
import GolfClubNFTInteractiveCard from 'components/GolfClubNFTInteractiveCard'
import { ButtonPrimary } from 'components/Button'

const Game = styled.div`
  width: 90vw;

  .slick-active {
    padding: 15px 15px;
  }

  .flex-container {
    background-color: ${({ neverLoaded, theme }) =>
      neverLoaded ? theme.bg2 : 'transparent'};
  }
`
const CollectionSlider = ({
  collection,
  isLoading,
  neverLoaded,
  onClick,
  selectedGolfClubId,
}) => {
  const [onlyReady, setOnlyReady] = useState(true)
  const slider = useRef(null)

  function toggleShow() {
    setOnlyReady(!onlyReady)
    const sliderApi = slider.current
    if (sliderApi?.slickGoTo) sliderApi.slickGoTo(0)
  }

  const settings = {
    dots: true,
    infinite: false,
    autoplay: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 5,
  }

  const filtered = collection?.filter(golfClub => {
    const canPlay = golfClub.secondsToPlay <= 0
    return onlyReady ? canPlay : true
  })

  return (
    <Flex justifyContent="center">
      <Game neverLoaded={neverLoaded}>
        <ButtonPrimary
          onClick={toggleShow}
          style={{ width: '100px', padding: '2px', margin: '10px 0px' }}
        >
          {onlyReady ? 'Show all' : 'Only ready!'}
        </ButtonPrimary>
        {onlyReady && collection.length > 0 && filtered.length === 0 && (
          <h4 style={{ padding: '15px' }}>
            Your GolfClubs needs to recharge before playing again.
            <br />
            The cooldown is 24h.
          </h4>
        )}
        <Flex
          style={{
            minHeight: '300px',
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
              <h4>Loading collection...</h4>
              <SimpleLoader />
            </div>
          )}
          <div style={{ width: '100%' }}>
            <Slider {...settings} ref={ref => (slider.current = ref)}>
              {filtered?.map(golfClub => {
                const isSelected = selectedGolfClubId === golfClub.id
                const canPlay = golfClub.secondsToPlay <= 0

                return (
                  <GolfClubNFTInteractiveCard
                    key={golfClub.id}
                    golfClub={golfClub}
                    clickOnCard={
                      canPlay ? () => onClick(golfClub.id) : () => {}
                    }
                    onClickButton={() => onClick(golfClub.id)}
                    width="100%"
                    buttonText={isSelected ? 'Selected' : 'Select'}
                    selected={isSelected}
                    blockButtonIfNotReady
                    style={{ cursor: 'pointer' }}
                  />
                )
              })}
            </Slider>
          </div>
        </Flex>
      </Game>
    </Flex>
  )
}

export default CollectionSlider
