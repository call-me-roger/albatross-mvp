import React from 'react'
import styled from 'styled-components'
import { Trans } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { ExternalLink as LinkIcon } from 'react-feather'

import CopyText from '../CopyText'
import { ButtonSecondary } from '../Button'
import { ExternalLink, TYPE } from '../../theme'
import { parseENSAddress } from 'utils/parseENSAddress'
import { useApplicationState } from 'store/application/state'
import { ACCOUNT_DETAILS } from 'store/application/types'
import History from 'components/History'
import { useAccountState } from 'store/account/state'

const Content = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.bg1};
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${props =>
    props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit'};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const UpperSection = styled.div`
  position: relative;

  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  h5:last-child {
    margin-bottom: 0px;
  }

  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const InfoCard = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 20px;
  position: relative;
  display: grid;
  grid-row-gap: 12px;
  margin-bottom: 20px;
`

const AccountGroupingRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  color: ${({ theme }) => theme.text1};

  div {
    ${({ theme }) => theme.flexRowNoWrap}
    align-items: center;
  }
`

const AccountSection = styled.div`
  padding: 0rem 1rem;
  ${({ theme }) =>
    theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
`

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`

const LowerSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.text2} !important;
  border-radius: 10px;
  text-align: center;

  h5 {
    margin: 0;
    font-weight: 400;
  }
`

const AccountControl = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 0;
  width: 100%;

  font-weight: 500;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }

  p {
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const AddressLink = styled(ExternalLink)`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`

const WalletAction = styled(ButtonSecondary)`
  width: fit-content;
  font-weight: 400;
  margin-left: 8px;
  font-size: 0.825rem;
  padding: 4px 6px;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

function AccountDetails({ logout, history }) {
  const { closePopup } = useApplicationState()
  const { address } = useAccountState()

  return (
    <Content>
      <UpperSection>
        <HeaderRow>
          <TYPE.largeHeader>
            <Trans>Account</Trans>
          </TYPE.largeHeader>
        </HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                Connected to Doric Wallet
                <div>
                  <WalletAction
                    style={{
                      fontSize: '.825rem',
                      fontWeight: 400,
                      marginRight: '8px',
                    }}
                    onClick={() =>
                      logout({
                        success: () => {
                          history.push(`/login`)
                          closePopup(ACCOUNT_DETAILS)
                        },
                      })
                    }
                  >
                    <Trans>Disconnect</Trans>
                  </WalletAction>
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow id="web3-account-identifier-row">
                <AccountControl>{parseENSAddress(address)}</AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                <>
                  <AccountControl>
                    <div>
                      <CopyText toCopy={address}>
                        <span style={{ marginLeft: '4px' }}>
                          <Trans>Copy Address</Trans>
                        </span>
                      </CopyText>

                      <AddressLink href="https://explorer.doric.network/">
                        <LinkIcon size={16} />
                        <span style={{ marginLeft: '4px' }}>
                          <Trans>View on Explorer</Trans>
                        </span>
                      </AddressLink>
                    </div>
                  </AccountControl>
                </>
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
      <LowerSection>
        <TYPE.body style={{ paddingBottom: '15px' }}>
          <Trans>
            <b>Recent transactions:</b>
          </Trans>
        </TYPE.body>
        <History
          seeMore
          simpleLayout
          limit={5}
          seeMoreCallback={() => closePopup(ACCOUNT_DETAILS)}
        />
      </LowerSection>
    </Content>
  )
}

export default withRouter(AccountDetails)
