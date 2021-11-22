import { ButtonPrimary } from 'components/Button'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAccountState } from 'store/account/state'
import styled from 'styled-components'

const Box = styled.div`
  color: ${({ theme }) => theme.text1};
  padding: 50px;
  text-align: center;
`

const Description = styled.div`
  color: ${({ theme }) => theme.text1};
  padding: 15px;
`

const Error403 = () => {
  const { isLoading } = useAccountState()
  const history = useHistory()

  return (
    <Box>
      {!isLoading && (
        <>
          <h1>Error 403 - Limited Access</h1>
          <Description>Connect your wallet to have full access.</Description>
          <ButtonPrimary onClick={() => history.push('/welcome')}>
            Go back to home
          </ButtonPrimary>
        </>
      )}
    </Box>
  )
}

export default Error403
