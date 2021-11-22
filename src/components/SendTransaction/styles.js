import styled from 'styled-components'

export const TransactionForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const MaxButton = styled.button`
  font-size: 11px;
  font-weight: bold;
  background-color: transparent;
  color: ${({ theme }) => theme.primary1};
  border: none;
  cursor: pointer;
`
