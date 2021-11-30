import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonPrimary } from 'components/Button'
import { Flex } from 'rebass'
import GolfClubNFTCard from 'components/GolfClubNFTCard'
import { FormInputRow, SimpleInput } from 'components/Forms/inputs'
import { ethers } from 'ethers'

const Modal = styled.div`
  width: 300px;
`

const TransferNFTModal = ({ onConfirm, onCancel, golfClub }) => {
  const [address, setAddress] = useState('')

  function handleConfirm() {
    onConfirm(address)
  }

  const invalidAddress = !ethers.utils.isAddress(address)

  return (
    <Modal style={{ minWidth: '500px !important' }}>
      <h2>TRANSFER NFT</h2>
      <GolfClubNFTCard golfClub={golfClub} />
      <h4 style={{ marginBottom: '0px' }}>To Address</h4>
      <FormInputRow error={address && invalidAddress} success={!invalidAddress}>
        <SimpleInput
          value={address}
          onChange={e => setAddress(e.target.value)}
          fontSize="10px"
          tabIndex="2"
          style={{ textAlign: 'right' }}
        />
      </FormInputRow>
      <Flex style={{ gap: '15px' }}>
        <ButtonPrimary
          onClick={onCancel}
          style={{
            backgroundColor: '#ccc',
            color: '#111',
          }}
        >
          Cancel
        </ButtonPrimary>
        <ButtonPrimary onClick={handleConfirm}>Confirm</ButtonPrimary>
      </Flex>
    </Modal>
  )
}

export default TransferNFTModal
