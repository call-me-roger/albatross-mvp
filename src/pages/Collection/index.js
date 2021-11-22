import React, { useEffect, useState } from 'react'
import { SimpleGrid } from 'pages/Template/styles'
import styled from '@emotion/styled'
import {
  claimRewards,
  getClaimBalance,
  getCollection,
  playGame,
} from 'contracts/GolfClub'
import moment from 'moment'
import { ButtonPrimary } from 'components/Button'
import { orderArrayByObjAttr } from '../../utils/array/sort'
import SimpleLoader from 'components/SimpleLoader'
import { useHistory } from 'react-router'
import { Flex } from 'rebass'

const Display = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`
const Item = styled.div`
  width: 23%;
  padding: 1%;

  text-align: center;

  .background {
    border-radius: 4px;
    padding: 15px;
    background-color: ${({ background }) => background};
  }
`

const Dashboard = () => {
  const [isLoading, setLoading] = useState(false)
  const [collection, setCollection] = useState([])
  const [claimBalance, setClaimBalance] = useState(0)
  const history = useHistory()

  async function refreshCollection() {
    setLoading(true)
    const newCollection = await getCollection()
    if (newCollection?.length > 0) {
      const ordered = orderArrayByObjAttr(newCollection, 'id')
      setCollection(ordered)
      const resultClaimBalance = await getClaimBalance()
      setClaimBalance(resultClaimBalance)
    }
    setLoading(false)
  }

  useEffect(() => {
    refreshCollection()
  }, [])

  function getBackgroundByRarity(_rarity) {
    if (_rarity === 3) return '#bb9700'
    if (_rarity === 2) return '#8a32db'
    if (_rarity === 1) return '#00b657'
    return '#c0c0c0'
  }

  function handleClaimRewards() {
    claimRewards(refreshCollection)
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
        {isLoading && <SimpleLoader />}
        {!isLoading && collection.length === 0 && (
          <>
            <h5>You have 0 Golf Clubs in your wallet.</h5>
            <ButtonPrimary
              style={{ width: 'auto' }}
              onClick={() => history.push('/')}
            >
              Mint your first one here!
            </ButtonPrimary>
          </>
        )}
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
              background={() => getBackgroundByRarity(golfClub.rarity)}
            >
              <div className="background">
                <img
                  src={golfClub.tokenURI}
                  style={{ width: '100%' }}
                  alt={golfClub.name}
                />
                {golfClub.name}
              </div>
              <br />
              <div>
                DNA: {golfClub.dna}
                <br />
                Durability: {golfClub.durability}
                <br />
                {`Wins: ${golfClub.winCount} | Loss: ${golfClub.lossCount}`}
                <br />
                <center>
                  <ButtonPrimary
                    style={{ width: '100px' }}
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
