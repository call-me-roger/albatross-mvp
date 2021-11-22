import styled from 'styled-components'

export const AddressLabel = styled.p`
  color: ${({ theme }) => theme.text2};
  text-transform: uppercase;
  font-weight: bold;
  font-size: 14px;
`
export const AddressNumber = styled.p`
  color: ${({ theme }) => theme.text1};
  font-weight: bold;
  max-width: 80vw;
  padding: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ theme }) => theme.bg2};
  align-items: center;
  justify-content: center;
  font-size: 14px;
`
