import React from 'react'
import styled from 'styled-components'
import { ButtonPrimary } from 'components/Button'
import GolfClubNFTCard from 'components/GolfClubNFTCard'

const Item = styled.div`
  width: ${({ width = '100%' }) => width};
  padding: 1%;
`

const GolfClubNFTInteractiveCard = ({
  golfClub,
  onClickButton,
  clickOnCard,
  width,
  buttonText,
  selected,
  blockButtonIfNotReady = false,
  price,
}) => {
  const canPlay = golfClub.secondsToPlay <= 0
  const blockButton = blockButtonIfNotReady && !canPlay

  return (
    <Item width={width}>
      <GolfClubNFTCard
        golfClub={golfClub}
        width="100%"
        selected={selected}
        onClick={clickOnCard}
      />
      <div>
        <center>
          <b>Price: {price}</b>
          <ButtonPrimary
            style={{ width: 'auto', marginTop: '15px', padding: '5px' }}
            onClick={blockButton ? () => {} : () => onClickButton(golfClub.id)}
            disabled={blockButton}
            className="action-button"
          >
            {buttonText}
          </ButtonPrimary>
        </center>
      </div>
    </Item>
  )
}

export default GolfClubNFTInteractiveCard
