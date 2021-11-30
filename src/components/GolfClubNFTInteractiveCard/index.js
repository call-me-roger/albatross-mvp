import React from 'react'
import styled from 'styled-components'
import { ButtonPrimary } from 'components/Button'
import GolfClubNFTCard from 'components/GolfClubNFTCard'
import { Flex } from 'rebass'

const Item = styled.div`
  width: ${({ width = '100%' }) => width};
  padding: 1%;
`

const GolfClubNFTInteractiveCard = ({
  golfClub,
  buttonText,
  secondaryButtonText,
  onClickButton,
  onClickSecondaryButton,
  clickOnCard,
  width,
  selected,
  blockButtonIfNotReady = false,
  blockSecondaryButton = false,
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
          {price && <b>Price: {price}</b>}
          <Flex
            justifyContent="center"
            alignItems="center"
            style={{ gap: '15px' }}
          >
            {secondaryButtonText && (
              <ButtonPrimary
                style={{ width: 'auto', marginTop: '15px', padding: '5px' }}
                onClick={
                  blockSecondaryButton
                    ? () => {}
                    : () => onClickSecondaryButton(golfClub.id)
                }
                disabled={blockSecondaryButton}
                className="action-button"
              >
                {secondaryButtonText}
              </ButtonPrimary>
            )}
            <ButtonPrimary
              style={{ width: 'auto', marginTop: '15px', padding: '5px' }}
              onClick={
                blockButton ? () => {} : () => onClickButton(golfClub.id)
              }
              disabled={blockButton}
              className="action-button"
            >
              {buttonText}
            </ButtonPrimary>
          </Flex>
        </center>
      </div>
    </Item>
  )
}

export default GolfClubNFTInteractiveCard
