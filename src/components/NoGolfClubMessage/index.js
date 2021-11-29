import React from 'react'
import { ButtonPrimary } from 'components/Button'

const NoGolfClubMessage = ({
  isLoading,
  collection,
  text = 'You have 0 Golf Clubs in your wallet.',
  buttonText = 'Mint your first one here!',
  onClick,
}) => {
  return (
    !isLoading &&
    collection.length === 0 && (
      <>
        <h5>{text}</h5>
        <ButtonPrimary
          style={{ width: 'auto' }}
          onClick={typeof onClick === 'function' ? onClick : () => {}}
        >
          {buttonText}
        </ButtonPrimary>
      </>
    )
  )
}

export default NoGolfClubMessage
