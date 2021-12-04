import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Flex } from 'rebass'
import { ButtonOutlined, ButtonPrimary } from 'components/Button'
import { getMintValueByQty, mint } from 'contracts/GolfClub'
import { FormInputRow, SimpleInput } from 'components/Forms/inputs'
import { MINT_RESULT_SUCCESS, MINT_START } from 'store/application/types'
import { useApplicationState } from 'store/application/state'
import SimpleLoader from 'components/SimpleLoader'
import { getPreviewGif } from 'constants/game'
import { useHistory } from 'react-router'

const Wrapper = styled.div``
const MintContainer = styled.div`
  padding: 15px;
  color: ${({ theme }) => theme.text1};
`

const GifBox = styled.div`
  margin: 15px;
  width: 300px;
  img {
    width: 100%;
    border-radius: 15px;
  }
`

const Dashboard = () => {
  const [quantity, setQuantity] = useState(1)
  const { openPopup, closePopup } = useApplicationState()
  const history = useHistory()
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
    <Wrapper>
      <Flex style={{ padding: '15px', gap: '15px' }} justifyContent="center">
        <MintContainer>
          <h1>MINT your own GOLF CLUB!</h1>
          <h4>
            It's a collection of 10000 exclusive and randomly generated Golf
            Clubs. <br />
            With 1 you can play-to-earn everyday and receive rawards to claim.
          </h4>
          <Flex style={{ gap: '15px' }}>
            <ButtonOutlined>Read Whitepaper</ButtonOutlined>
            <ButtonOutlined onClick={() => history.push('/marketplace')}>
              See marketplace
            </ButtonOutlined>
          </Flex>
          <div style={{ paddingTop: '20px', maxWidth: '500px' }}>
            <h3>How to play?</h3>
            <p>
              With 1 Golf Club you can play everyday and try to earn some
              rewards.
              <br />
              <br />
              1. You'll have to find a new tournament to start playing.
              <br />
              <br />
              2. Each Tournament have 18 holes to complete.
              <br />
              <br />
              3. The tournament starts at the hole 1, if you make a successfull
              play then you go to the next hole.
              <br />
              <br />
              4. Each Golf Club have a 24h cooldown to play again.
              <br />
              <br />
              5. The #18 hole is the final hole of the tournament and have a
              special prize.
              <br />
              <br />
              6. After the #18 hole is scored and the tournament is finished,
              you'll receive a Prize Roulette.
              <br />
              <br />
              8. The Prize Roulette can give you{' '}
              <b>
                NFT Upgrades, NFT Claims, GOLFC Coins, Energy Recharges, Repair
                Kits and also, if you're not lucky, nothing!
              </b>
            </p>
          </div>
        </MintContainer>
        <GifBox>
          <img src={getPreviewGif()} alt="Golf Club Collection Preview Gif" />
          <Flex
            justifyContent="flex-start"
            flexDirection="column"
            style={{ minWidth: '250px', maxWidth: '300px' }}
          >
            <div>
              <h4 style={{ marginBottom: '0px' }}>Mint quantity</h4>
              <FormInputRow>
                <SimpleInput
                  value={quantity}
                  onChange={e => updateQuantity(e)}
                  fontSize="18px"
                  style={{ textAlign: 'right' }}
                />
              </FormInputRow>
            </div>
            <ButtonPrimary onClick={handleMint} style={{ width: 'auto' }}>
              {getMintValueByQty(quantity)} DRC to MINT NOW!
            </ButtonPrimary>
          </Flex>
        </GifBox>
      </Flex>
    </Wrapper>
  )
}

export default Dashboard
