import React, { useState } from 'react'
import { SimpleGrid } from 'pages/Template/styles'
import styled from '@emotion/styled'
import { Flex } from 'rebass'
import { theme } from 'theme'
import { ButtonPrimary } from 'components/Button'
import { getMintValueByQty, mint } from 'contracts/GolfClub'
import Input from 'components/NumericalInput'
import { InputRow } from 'components/Forms/inputs'

const MintContainer = styled.div`
  padding: 15px;
`

const GifBox = styled.div`
  margin: 15px;
  width: 300px;
  height: 350px;
  border: 2px solid ${theme.text1};
  background-color: ${theme.bg1};
`

const Dashboard = () => {
  const [quantity, setQuantity] = useState(1)
  const maxMintPerRequest = 5

  function handleMint() {
    if (quantity > 0) mint(quantity)
  }

  function updateQuantity(e) {
    const { value } = e.target
    if (value === 0) {
      setQuantity(1)
    } else {
      const finalQty = value <= maxMintPerRequest ? value : maxMintPerRequest
      setQuantity(finalQty)
    }
  }

  return (
    <SimpleGrid>
      <Flex style={{ padding: '15px' }}>
        <MintContainer>
          <h1>Here you can MINT your own GOLF CLUB!</h1>
          <h4>
            It's a collection of 5000 exclusive and randomly generated Golf
            Clubs. <br />
            With 1 you can play-to-earn everyday and receive rawards to claim.
          </h4>
          <Flex justifyContent="flex-start">
            <InputRow>
              <Input
                style={{ textAlign: 'right' }}
                value={quantity}
                onChange={updateQuantity}
                placeholder="Quantity"
              />
            </InputRow>
            <ButtonPrimary onClick={handleMint} style={{ width: 'auto' }}>
              {getMintValueByQty(quantity)} DRC to MINT NOW!
            </ButtonPrimary>
          </Flex>
        </MintContainer>
        <GifBox />
      </Flex>
    </SimpleGrid>
  )
}

export default Dashboard
