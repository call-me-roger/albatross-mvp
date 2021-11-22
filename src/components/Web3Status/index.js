import styled from 'styled-components'
import { darken, lighten } from 'polished'
import { ButtonSecondary } from 'components/Button'

export const Web3StatusGeneric = styled(ButtonSecondary)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
`

export const Web3StatusConnected = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.bg1};
  border: 1px solid ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text1};
  font-weight: 500;
  :hover,
  :focus {
    background-color: ${({ theme }) => lighten(0.05, theme.bg1)};
    border: 1px solid ${({ theme }) => darken(0.1, theme.primary1)};
  }
`
