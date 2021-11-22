import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Trans } from 'react-i18next'
import { ExternalLink as LinkIcon } from 'react-feather'

import CopyText from '../CopyText'
import { ExternalLink } from '../../theme'
import { getExplorerTXURL } from 'constants/explorer'

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

function TransactionDetails({ address, action, addressAction, hash }) {
  return (
    <Content>
      <UpperSection>
        <HeaderRow>
          <Trans>Transaction Details</Trans>
        </HeaderRow>
        <InfoCard>
          <AccountGroupingRow>{action}</AccountGroupingRow>
          <AccountGroupingRow>
            <AccountControl>{addressAction}</AccountControl>
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

                  <AddressLink href={getExplorerTXURL(hash)}>
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
      </UpperSection>
    </Content>
  )
}

TransactionDetails.propTypes = {
  address: PropTypes.string.isRequired,
  action: PropTypes.node.isRequired,
  addressAction: PropTypes.node.isRequired,
}

export default TransactionDetails
