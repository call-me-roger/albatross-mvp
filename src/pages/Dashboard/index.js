import React from 'react'
import { SimpleGrid } from 'pages/Template/styles'
import styled from '@emotion/styled'
import { Flex } from 'rebass'
import { theme } from 'theme'
import { ButtonPrimary } from 'components/Button'
import { mint } from 'contracts/GolfClub'

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
  function handleMint() {
    mint()
  }

  return (
    <SimpleGrid>
      <Flex style={{ padding: '15px' }}>
        <MintContainer>
          <h1>Here you can MINT your own GOLF CLUB!</h1>
          <h4>
            They are a collection of 5000 exclusive and randomly generated Golf
            Clubs. <br />
            With 1 you can play-to-earn everyday and receive rawards to claim.
          </h4>
          <ButtonPrimary onClick={handleMint} style={{ width: '200px' }}>
            0.1 DRC to MINT NOW!
          </ButtonPrimary>
        </MintContainer>
        <GifBox />
      </Flex>
    </SimpleGrid>
  )
}

export default Dashboard
