import React, { useState } from 'react'
import { SimpleGrid } from 'pages/Template/styles'
import styled from '@emotion/styled'
import { Flex } from 'rebass'
import { theme } from 'theme'
import { ButtonPrimary } from 'components/Button'
import { getMintValueByQty, mint } from 'contracts/GolfClub'
import Input from 'components/NumericalInput'
import { InputRow } from 'components/Forms/inputs'
import { MINT_RESULT_SUCCESS, MINT_START } from 'store/application/types'
import { useApplicationState } from 'store/application/state'
import SimpleLoader from 'components/SimpleLoader'

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
  const { openPopup, closePopup } = useApplicationState()
  const maxMintPerRequest = 5

  function mintedNftEffect() {
    closePopup(MINT_START)
    openPopup(MINT_RESULT_SUCCESS, () => (
      <div>
        <h1>Your NFT was minted!</h1>
        <ButtonPrimary
          onClick={() => closePopup(MINT_RESULT_SUCCESS)}
          style={{ width: '150px' }}
        >
          Continue...
        </ButtonPrimary>
      </div>
    ))
  }

  function errorMinting() {
    closePopup(MINT_START)
    openPopup(MINT_RESULT_SUCCESS, () => (
      <div>
        <h3>Error trying to mint the NFT.</h3>
        <h4>You can reload the page and try again.</h4>
        <ButtonPrimary
          onClick={() => window.location.reload()}
          style={{ width: '150px' }}
        >
          Reload page
        </ButtonPrimary>
      </div>
    ))
  }

  function waitConfirmation() {
    openPopup(MINT_START, () => (
      <div align="center">
        <h3>Transaction sent. </h3>
        <h4>Waiting block confirmations...</h4>
        <SimpleLoader />
      </div>
    ))
  }

  function handleMint() {
    if (quantity > 0) {
      openPopup(MINT_START, () => (
        <div align="center">
          <h3>Waiting user to approve the transaction...</h3>
          <SimpleLoader />
        </div>
      ))
      mint(quantity, {
        onSuccess: mintedNftEffect,
        onError: errorMinting,
        onSendTransaction: waitConfirmation,
      })
    }
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
      <Flex style={{ padding: '15px' }} justifyContent="center">
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
