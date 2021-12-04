import { ButtonPrimary } from 'components/Button'
import React from 'react'
import { DollarSign, FolderPlus, Star, Tool, Zap } from 'react-feather'
import { Flex } from 'rebass'
import { useRouletteState } from 'store/roulette/state'
import styled from 'styled-components'

import './styles.css'

const Item = styled.div`
  &:before {
    border-right-color: ${({ bgColor }) => `${bgColor} !important`};
  }
  font-size: 18px;
  font-weight: bold;
  color: ${({ color }) => color} !important;

  div {
    position: relative;
    left: 100px;
    filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.9));
  }
`

const RoulettePriveder = () => {
  const { showRoulette, selectedPrize, closeRoulette, readyToClose } =
    useRouletteState()

  const items = [
    { index: 0, text: <>NOTHING</>, bgColor: '#999', color: '#fff' },
    {
      index: 1,
      text: 'REPAIR KIT',
      icon: <Tool />,
      bgColor: '#ec4848',
      color: '#fff',
    },
    {
      index: 2,
      text: 'ENERGY RECHARGE',
      icon: <Zap />,
      bgColor: '#0082d8',
      color: '#fff',
    },
    {
      index: 3,
      text: 'GOLFC COINS',
      icon: <DollarSign />,
      bgColor: '#00d54c',
      color: '#fff',
    },
    {
      index: 4,
      text: 'FREE NFT',
      icon: <FolderPlus />,
      bgColor: '#8b009e',
      color: '#fff',
    },
    {
      index: 5,
      text: 'UPGRADE NFT',
      icon: <Star />,
      bgColor: '#c9a900',
      color: '#fff',
    },
  ]
  const wheelVars = {
    '--nb-item': items?.length,
    '--selected-item': selectedPrize,
  }
  const spinning = selectedPrize !== null ? 'spinning' : ''

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: '0px',
        left: '0px',
        right: '0px',
        zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.5)',
        visibility: showRoulette ? 'visible' : 'hidden',
        opacity: showRoulette ? 1 : 0,
        transition: '.3s',
        flexDirection: 'column',
      }}
      onClick={closeRoulette}
    >
      <div className="wheel-container">
        <div className={`wheel ${spinning}`} style={wheelVars}>
          {items?.map(item => (
            <Item
              className="wheel-item"
              key={item.index}
              style={{
                '--item-nb': item.index,
              }}
              color={item.color}
              bgColor={item.bgColor}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  left: '20px',
                  textAlign: 'left',
                }}
              >
                <div style={{ margin: '0px 15px' }}>{item.icon}</div>
                <div className="text">{item.text}</div>
              </div>
            </Item>
          ))}
        </div>
      </div>
      {readyToClose && (
        <ButtonPrimary
          style={{ width: '200px', position: 'fixed', bottom: '50px' }}
        >
          Continue...
        </ButtonPrimary>
      )}
    </Flex>
  )
}

export default RoulettePriveder
