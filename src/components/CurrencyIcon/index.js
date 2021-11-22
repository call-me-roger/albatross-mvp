import React from 'react'
import styled from 'styled-components'
import { getImageBySymbol } from 'constants/images'

const Image = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 10px;
`

const CurrencyIcon = ({ symbol, ...props }) => {
  return (
    <Image
      src={getImageBySymbol(symbol)}
      title={symbol}
      alt={symbol}
      {...props}
    />
  )
}

export default CurrencyIcon
