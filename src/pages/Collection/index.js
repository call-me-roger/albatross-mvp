import React, { useEffect, useState } from 'react'
import { SimpleGrid } from 'pages/Template/styles'
import {
  claimRewards,
  findGame,
  getBackgroundByRarity,
  getClaimBalance,
  getCollection,
  getPerkByType,
  getRarityTextByInt,
  getSecondsToPlayPercentage,
  playGame,
} from 'contracts/GolfClub'
import moment from 'moment'
import styled from 'styled-components'
import { ButtonPrimary } from 'components/Button'
import { orderArrayByObjAttr } from '../../utils/array/sort'
import SimpleLoader from 'components/SimpleLoader'
import { Flex } from 'rebass'
import { darken } from 'polished'
import useLoading from 'hooks/useLoading'
import NoGolfClubMessage from 'components/NoGolfClubMessage'

const Display = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`
const Item = styled.div`
  position: relative;
  width: 15.6%;
  padding: 1%;

  text-align: center;

  .card {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    padding: 20px 50px;
    background-color: ${({ background }) => background};
    border: ${({ background }) => `2px solid ${darken('0.3', background)}`};
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
  background-color: #ccc;
  border-radius: 10px;
  &:before {
    position: absolute;
    border-radius: 10px;
    left: 0px;
    bottom: 0px;
    content: '';
    width: ${({ percentWidth }) => percentWidth};
    height: 5px;
    background-color: #cdff8d;
  }
`

const Dashboard = () => {
  const [collection, setCollection] = useState([])
  const [claimBalance, setClaimBalance] = useState(0)
  const { isLoading, startLoading, stopLoading } = useLoading()

  async function refreshCollection() {
    startLoading()
    const newCollection = await getCollection()
    if (newCollection?.length > 0) {
      const ordered = orderArrayByObjAttr(newCollection, 'id', null, true)
      setCollection(ordered)
      const resultClaimBalance = await getClaimBalance()
      setClaimBalance(resultClaimBalance)
    }
    stopLoading()
  }

  useEffect(() => {
    refreshCollection()
    // eslint-disable-next-line
  }, [])

  function handleClaimRewards() {
    claimRewards(refreshCollection)
  }

  function handleFindGame() {
    findGame(refreshCollection)
  }

  return (
    <SimpleGrid>
      <center>
        <h1>Your Golf Club Collection</h1>
        <Flex justifyContent="center" alignItems="center">
          <div>
            <b>Rewards: {claimBalance}</b>
          </div>
          <ButtonPrimary
            style={{ margin: '0px 15px', padding: '2px 15px', width: 'auto' }}
            disabled={claimBalance <= 0}
            onClick={handleClaimRewards}
          >
            Claim
          </ButtonPrimary>
        </Flex>
        <div>
          <br />
          {collection.length > 0 && (
            <ButtonPrimary style={{ width: '200px' }} onClick={handleFindGame}>
              Find new games
            </ButtonPrimary>
          )}
        </div>
        {isLoading && <SimpleLoader />}
        <NoGolfClubMessage isLoading={isLoading} collection={collection} />
      </center>
      <Display>
        {collection.map((golfClub, index) => {
          const readyTime = moment
            .utc(golfClub.secondsToPlay * 1000)
            .format('HH:mm:ss')
          const canPlay = golfClub.secondsToPlay <= 0

          return (
            <Item
              key={index}
              background={getBackgroundByRarity(golfClub.rarity)}
            >
              <div className="card">
                <img
                  src={golfClub.tokenURI}
                  style={{ width: '100%' }}
                  alt={golfClub.name}
                />
                <Level background={getBackgroundByRarity(golfClub.rarity)}>
                  {golfClub.level}
                </Level>
                <Attributes background={getBackgroundByRarity(golfClub.rarity)}>
                  <div className="perk">
                    <label>Perk</label>
                    {getPerkByType(golfClub.playType)}
                  </div>
                  <div className="win-loss">
                    <label>Wins/Loss</label>
                    {golfClub.winCount}/{golfClub.lossCount}
                  </div>
                  <div className="bottom-texts">
                    <div className="rarity">
                      {getRarityTextByInt(golfClub.rarity)}
                    </div>
                    <div className="name">{golfClub.name}</div>
                  </div>
                  <SecondsToPlay
                    percentWidth={`${getSecondsToPlayPercentage(
                      golfClub.secondsToPlay,
                    )}px`}
                  />
                </Attributes>
              </div>
              <div>
                <center>
                  <ButtonPrimary
                    style={{ width: '100px', marginTop: '15px' }}
                    onClick={
                      canPlay
                        ? () => playGame(golfClub.id, refreshCollection)
                        : () => {}
                    }
                    disabled={!canPlay}
                    title={canPlay ? '' : `Next game: ${readyTime}`}
                  >
                    Play
                  </ButtonPrimary>
                </center>
              </div>
            </Item>
          )
        })}
      </Display>
    </SimpleGrid>
  )
}

export default Dashboard
