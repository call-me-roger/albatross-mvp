import React from 'react'
import useScrollPosition from '@react-hook/window-scroll'
import { Flex, Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Moon, Sun } from 'react-feather'
import { darken } from 'polished'
import { ExternalLink } from '../../theme'
import Row, { RowFixed } from '../Row'
import { Web3StatusConnected } from 'components/Web3Status'
import { useApplicationState } from 'store/application/state'
import AccountDetails from 'components/AccountDetails'
import { parseENSAddress } from 'utils/parseENSAddress'
import { Grid } from 'react-feather'
import { HideSmall, SmallOnly } from '../../theme'
import { useLocalState } from 'store/local/state'
import { ACCOUNT_DETAILS } from 'store/application/types'
import { useAccountState } from 'store/account/state'
import HeaderRoulletRewards from 'components/HeaderRoulletRewards'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;
  /* Background slide effect on scroll. */
  background-image: ${({ theme }) =>
    `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50% )}}`};
  background-position: ${({ showBackground }) =>
    showBackground ? '0 -100%' : '0 0'};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px
    ${({ theme, showBackground }) =>
      showBackground ? theme.bg2 : 'transparent;'};
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    grid-template-columns: 48px 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding:  1rem;
    grid-template-columns: 1fr 1fr;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding:  1rem;
    grid-template-columns: 36px 1fr;
  `};
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  justify-self: center;
  background-color: ${({ theme }) => theme.bg0};
  width: fit-content;
  padding: 4px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  align-items: center;

  ${({ theme }) => theme.mediaWidth.upToLarge`
    justify-self: start;  
  `};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: center;
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    z-index: 99;
    position: fixed;
    bottom: 0; 
    right: 50%;
    transform: translate(50%,-50%);
    margin: 0 auto;
    background-color: ${({ theme }) => theme.bg0};
    border: 1px solid ${({ theme }) => theme.bg2};
    box-shadow: 0px 6px 10px rgb(0 0 0 / 2%);
  `};
`

const AccountElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg2)};
  border-radius: 12px;
  white-space: nowrap;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  text-decoration: none;
  font-size: 28px;
  white-space: nowrap;
  font-family: 'Satisfy', cursive;
  color: ${({ theme }) => theme.text1};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};

  :hover {
    cursor: pointer;
  }
`
const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg3};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

export const StyledMenuButton = styled(ExternalLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
    text-decoration: none;
  }
`

function Header() {
  const { isDarkMode, toggleDarkMode } = useLocalState()
  const { openPopup, closePopup } = useApplicationState()
  const { isLogged, address, balance } = useAccountState()

  const scrollY = useScrollPosition()

  return (
    <HeaderFrame showBackground={scrollY > 45}>
      <HeaderRow>
        <Title href=".">Albatross: The Golf Club</Title>
      </HeaderRow>

      {isLogged && (
        <HeaderLinks isDarkMode={isDarkMode}>
          <StyledNavLink id={`dashboard-nav-link`} to={'/'} exact>
            <HideSmall>Mint Golf Club</HideSmall>
            <SmallOnly>
              <Grid />
            </SmallOnly>
          </StyledNavLink>
          <StyledNavLink id={`collection-nav-link`} to={'/collection'} exact>
            <HideSmall>Collection</HideSmall>
            <SmallOnly>
              <Grid />
            </SmallOnly>
          </StyledNavLink>
          <StyledNavLink id={`marketplace-nav-link`} to={'/marketplace'} exact>
            <HideSmall>Marketplace</HideSmall>
            <SmallOnly>
              <Grid />
            </SmallOnly>
          </StyledNavLink>
          <StyledNavLink id={`play-nav-link`} to={'/play'} exact>
            <HideSmall>Play!</HideSmall>
            <SmallOnly>
              <Grid />
            </SmallOnly>
          </StyledNavLink>
        </HeaderLinks>
      )}

      <HeaderControls>
        {isLogged && (
          <Flex flexDirection="column">
            <HeaderElement>
              <AccountElement
                active
                style={{ pointerEvents: 'auto' }}
                onClick={() =>
                  openPopup(ACCOUNT_DETAILS, () => (
                    <AccountDetails
                      toggleWalletModal={() => closePopup(ACCOUNT_DETAILS)}
                    />
                  ))
                }
              >
                <BalanceText
                  style={{ flexShrink: 0 }}
                  pl="0.75rem"
                  pr="0.5rem"
                  fontWeight={500}
                >
                  {balance} DRC
                </BalanceText>
                <Web3StatusConnected id="web3-status-connected">
                  <Text>{parseENSAddress(address)}</Text>
                </Web3StatusConnected>
              </AccountElement>
            </HeaderElement>
            <HeaderRoulletRewards />
          </Flex>
        )}

        <HeaderElementWrap>
          <StyledMenuButton onClick={() => toggleDarkMode()}>
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
          </StyledMenuButton>
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}

export default Header
