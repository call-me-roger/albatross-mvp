import SimpleLoader from 'components/SimpleLoader'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { Flex } from 'rebass'
import GolfClubNFTCard from 'components/GolfClubNFTCard'
import { ButtonPrimary } from 'components/Button'

const Game = styled.div`
  width: 90vw;
`
const CollectionSlider = ({
  collection,
  isLoading,
  onClick,
  selectedGolfClub,
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
      <Game>
        {isLoading && (
          <center>
            <SimpleLoader />
          </center>
        )}
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
        <Slider {...settings} ref={ref => (slider.current = ref)}>
          {filtered?.map(golfClub => {
            const isSelected = selectedGolfClub === golfClub.id
            return (
              <GolfClubNFTCard
                key={golfClub.id}
                golfClub={golfClub}
                onClick={() => onClick(golfClub.id)}
                width="100%"
                buttonText={isSelected ? 'Selected' : 'Select'}
                selected={isSelected}
                blockButtonIfNotReady
              />
            )
          })}
        </Slider>
      </Game>
    </Flex>
  )
}

export default CollectionSlider
