import React from 'react'
import { ButtonPrimary } from 'components/Button'
import { useHistory } from 'react-router'

const NoGolfClubMessage = ({ isLoading, collection }) => {
  const history = useHistory()

  return (
    !isLoading &&
    collection.length === 0 && (
      <>
        <h5>You have 0 Golf Clubs in your wallet.</h5>
        <ButtonPrimary
          style={{ width: 'auto' }}
          onClick={() => history.push('/')}
        >
          Mint your first one here!
        </ButtonPrimary>
      </>
    )
  )
}

export default NoGolfClubMessage
