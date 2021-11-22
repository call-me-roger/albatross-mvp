import React from 'react'
import styled from 'styled-components'
import { DoricLogoIcon } from 'components/DoricLogo/DoricLogoWhite'
import { darken } from 'polished'
import { ExternalLink } from '../../theme'

const BuyDoricBtn = styled.div`
  height: 37px;
  display: flex;
  align-items: center;
  padding: 0px 15px;
  background-color: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.primaryText1};
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;

  .logo {
    margin-right: 10px;
    width: 1.5em;
    height: 1.5em;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.03, theme.primary5)};
  }
`

export const BuyDoric = () => {
  return (
    <BuyDoricBtn>
      <DoricLogoIcon className="logo" color="#fff" />

      <ExternalLink href="https://www.coinbase.com/">Buy Doric</ExternalLink>
    </BuyDoricBtn>
  )
}
