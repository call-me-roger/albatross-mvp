import React, { useState } from 'react'
import styled from 'styled-components'
import { ButtonPrimary } from 'components/Button'
import { CurrencyInputPanel } from 'components/CurrencyInputPanel'
import { Flex } from 'rebass'

const Modal = styled.div`
  width: 300px;
`

const SellNFTModal = ({ onConfirm, onCancel }) => {
  const [price, setPrice] = useState('')

  function handleConfirm() {
    onConfirm(price)
  }

  return (
    <Modal style={{ minWidth: '500px !important' }}>
      <CurrencyInputPanel
        value={price}
        onUserInput={newValue => setPrice(newValue)}
      />
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

export default SellNFTModal
