import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { ButtonPrimary } from 'components/Button'
import { darken } from 'polished'
import {
  getBackgroundByRarity,
  getPerkByType,
  getRarityTextByInt,
  getSecondsToPlayPercentage,
} from 'contracts/GolfClub'

const Item = styled.div`
  cursor: pointer;
  position: relative;
  width: ${({ width = '100%' }) => width};
  padding: 1%;
  transform: ${({ selected }) => (selected ? 'scale(1.1)' : 'scale(1)')};

  text-align: center;

  .card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    padding: 20px 50px;
    background-color: ${({ background }) => background};
    border: ${({ background }) => `4px solid ${darken('0.3', background)}`};
  }

  .action-button {
    border: ${({ selected }) =>
      selected ? '1px solid #fff' : '1px solid transparent'};
  }
`

const Level = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  width: 30px;
  height: 30px;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  z-index: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Satisfy', cursive;
  text-shadow: 2px 0 0 #000, -1px 0 0 #000, 0 2px 0 #000, 0 -1px 0 #000,
    2px 2px #000, -1px -1px 0 #000, 2px -1px 0 #000, -1px 2px 0 #000;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: ${({ background }) => darken('0.3', background)};
    transform: rotate(45deg);
    z-index: -1;
  }
`

const Attributes = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
  padding: 10px;
  padding-bottom: 15px;
  font-size: 20px;
  width: 100%;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 0 0 #000, -1px 0 0 #000, 0 2px 0 #000, 0 -1px 0 #000,
    2px 2px #000, -1px -1px 0 #000, 2px -1px 0 #000, -1px 2px 0 #000;

  .perk,
  .win-loss {
    font-weight: normal;
    position: relative;
    padding: 10px;
    width: 100px;
    height: 35px;
    background: ${({ background }) => darken('0.3', background)};
    border-radius: 10px;
    border: 1px solid #111;
    line-height: 18px;
    text-align: right;
    margin-top: 15px !important;
    font-family: 'Satisfy', cursive;
    label {
      display: block;
      position: absolute;
      text-align: left !important;
      height: 20px;
      line-height: 20px;
      top: -10px;
      font-size: 16px;
      font-family: 'Satisfy', cursive;
    }
  }
  .bottom-texts {
    position: absolute;
    right: 10px;
    bottom: 15px;
    text-align: right;
    font-size: 16px;
    font-family: 'Satisfy', cursive;

    .rarity,
    .name {
      font-family: 'Satisfy', cursive;
    }
    .rarity {
      color: #ccc;
    }
  }
`

const SecondsToPlay = styled.div`
  position: absolute;
  left: 0;
  bottom: 0px;
  height: 5px;
  width: 100%;
  background-color: ${({ background }) => darken('0.3', background)};
  &:before {
    position: absolute;
    left: 0px;
    bottom: 0px;
    content: '';
    width: ${({ percentWidth }) => percentWidth};
    height: 5px;
    background-color: #cdff8d;
  }

  .hidden-text {
    font-size: 10px;
    text-align: center;
    color: #222;
    font-weight: bold;
    position: relative;
    z-index: 2;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    text-shadow: none;
  }

  &:hover {
    height: 12px;
    &:before {
      height: 12px;
    }
    .hidden-text {
      visibility: visible;
      opacity: 1;
    }
  }
`

const GolfClubNFTCard = ({
  golfClub,
  onClick,
  width,
  buttonText,
  selected,
  blockButtonIfNotReady = false,
  clickOnCard,
}) => {
  const readyTime = moment.utc(golfClub.secondsToPlay * 1000).format('HH:mm:ss')
  const canPlay = golfClub.secondsToPlay <= 0
  const canPlayText = canPlay ? 'Ready!' : `Next game: ${readyTime}`
  const blockButton = blockButtonIfNotReady && !canPlay
  const background = getBackgroundByRarity(golfClub.rarity)
  const clickOnCardFunc =
    typeof clickOnCard === 'function' ? clickOnCard : () => {}

  return (
    <Item
      background={background}
      width={width}
      selected={selected}
      onClick={clickOnCardFunc}
    >
      <div className="card">
        <img
          src={golfClub.tokenURI}
          style={{ width: '100%' }}
          alt={golfClub.name}
        />
        <Level background={background}>{golfClub.level}</Level>
        <Attributes background={background}>
          <div className="perk">
            <label>Perk</label>
            {getPerkByType(golfClub.playType)}
          </div>
          <div className="win-loss">
            <label>Wins/Loss</label>
            {golfClub.winCount}/{golfClub.lossCount}
          </div>
          <div className="bottom-texts">
            <div className="rarity">{getRarityTextByInt(golfClub.rarity)}</div>
            <div className="name">{golfClub.name}</div>
          </div>
          <SecondsToPlay
            percentWidth={
              canPlay
                ? '100%'
                : `${getSecondsToPlayPercentage(golfClub.secondsToPlay)}%`
            }
            background={background}
            title={canPlayText}
          >
            <div className="hidden-text">{canPlayText}</div>
          </SecondsToPlay>
        </Attributes>
      </div>
      <div>
        <center>
          <ButtonPrimary
            style={{ width: 'auto', marginTop: '15px', padding: '5px' }}
            onClick={blockButton ? () => {} : () => onClick(golfClub.id)}
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

export default GolfClubNFTCard