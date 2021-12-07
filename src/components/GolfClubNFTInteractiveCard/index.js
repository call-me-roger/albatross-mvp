import React from 'react'
import styled from 'styled-components'
import { ButtonPrimary } from 'components/Button'
import GolfClubNFTCard from 'components/GolfClubNFTCard'
import { Flex } from 'rebass'

export const NFT_CARD_WIDTH = 250

const Item = styled.div`
  width: ${NFT_CARD_WIDTH}px;
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
  blockPrimaryButton = false,
  blockSecondaryButton = false,
  price,
}) => {
  const canPlay = golfClub?.gameplay?.secondsToPlay <= 0
  const blockButton = (blockButtonIfNotReady && !canPlay) || blockPrimaryButton

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
