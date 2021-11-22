import { ButtonGray, ButtonPrimary } from 'components/Button'
import { getExplorerTXURL } from 'constants/explorer'
import React from 'react'
import { AlertOctagon, CheckSquare, FileText, Key, Send } from 'react-feather'
import styled, { keyframes } from 'styled-components'

const Box = styled.div`
  padding: 15px;
`

const loading = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Icon = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 80px;
  height: 80px;
  transform: translateZ(0);
  border-radius: 50%;
  background-color: ${({ theme }) => theme.bg2};
  margin: 0 auto;

  &:after {
    content: '';
    opacity: ${({ isLoading }) => (isLoading ? '1' : '0')};
    border: ${({ theme }) => `2px solid ${theme.success}`};
    border-left: 2px solid transparent;
    position: absolute;
    left: 0;
    right: 0;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: ${loading} 1.1s infinite linear;
    margin: 0 auto;
    z-index: -1;
  }

  svg {
    width: 50px;
    height: 50px;
    color: ${({ error, theme }) => (error ? theme.error : theme.success)};
  }
`

const Message = styled.div`
  margin: 15px;
`

export function parseError(errMessage) {
  const { message } = errMessage || {}
  return message
}

export function getDialogByResponse(slug, { onClose, onTryAgain, params }) {
  const { error, tx } = params || {}
  const { hash } = tx || {}

  if (error || slug === 'ERROR') {
    return {
      display: (
        <Box>
          <Icon error>
            <AlertOctagon />
          </Icon>
          <Message>{parseError(error)}</Message>
          <ButtonPrimary mt="1" onClick={onTryAgain}>
            Try again
          </ButtonPrimary>
        </Box>
      ),
      type: 'ERROR',
    }
  }

  if (slug === 'LOADING') {
    return {
      display: (
        <Box>
          <Icon isLoading>
            <FileText />
          </Icon>
          <Message>Validating transaction</Message>
        </Box>
      ),
      type: 'EVENT',
    }
  }

  if (slug === 'WALLET_CONNECTED') {
    return {
      display: (
        <Box>
          <Icon isLoading>
            <Key />
          </Icon>
          <Message>Wallet connected</Message>
        </Box>
      ),
      type: 'EVENT',
    }
  }

  if (slug === 'WAITING_CONFIRMATION') {
    return {
      display: (
        <Box>
          <Icon isLoading>
            <CheckSquare />
          </Icon>
          <Message>Waiting for block confirmations</Message>
        </Box>
      ),
      type: 'EVENT',
    }
  }

  if (slug === 'TRANSACTION_SENT') {
    return {
      display: (
        <Box>
          <Icon>
            <Send />
          </Icon>
          <Message>Transaction confirmed</Message>
          <ButtonPrimary
            mt="1"
            onClick={() => window.open(getExplorerTXURL(hash), '_blank')}
          >
            Transaction details
          </ButtonPrimary>
          <ButtonGray mt="2" onClick={onClose}>
            Close
          </ButtonGray>
        </Box>
      ),
      type: 'EVENT',
    }
  }

  if (slug === 'STAKE_SENT') {
    return {
      display: (
        <Box>
          <Icon>
            <Send />
          </Icon>
          <Message>Stake confirmed</Message>
          <ButtonPrimary
            mt="1"
            onClick={() => window.open(getExplorerTXURL(hash), '_blank')}
          >
            Transaction details
          </ButtonPrimary>
          <ButtonGray mt="2" onClick={onClose}>
            Close
          </ButtonGray>
        </Box>
      ),
      type: 'EVENT',
    }
  }

  if (slug === 'UNSTAKE_SENT') {
    return {
      display: (
        <Box>
          <Icon>
            <Send />
          </Icon>
          <Message>Unstake confirmed</Message>
          <ButtonPrimary
            mt="1"
            onClick={() => window.open(getExplorerTXURL(hash), '_blank')}
          >
            Transaction details
          </ButtonPrimary>
          <ButtonGray mt="2" onClick={onClose}>
            Close
          </ButtonGray>
        </Box>
      ),
      type: 'EVENT',
    }
  }

  if (slug === 'SAME_ADDRESS') {
    return {
      display: (
        <Box>
          <Icon error>
            <AlertOctagon />
          </Icon>
          <Message>Can&apos;t send a transaction to your own address</Message>
          <ButtonPrimary mt="1" onClick={onClose}>
            Go back
          </ButtonPrimary>
        </Box>
      ),
      type: 'ERROR',
    }
  }

  return { display: null }
}
