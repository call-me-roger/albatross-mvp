import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import styled from 'styled-components'
import QRCode from 'qrcode.react'
import { AutoColumn } from 'components/Column'
import PageTitle from 'components/Titles/Page'
import Card, { ShadowCard } from 'components/Card'
import CopyText from 'components/CopyText'
import { SimpleGrid } from 'pages/Template/styles'
import { Address, Send } from '../../components'

const QRCodeWrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-itens: center;
  padding: 15px;
`

const CardSection = styled(AutoColumn)`
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 1fr;
    grid-template-columns: auto;
    grid-template-rows: auto;
  `};
`

const LeftCard = styled(Card)`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;

  * {
    color: ${({ theme }) => theme.text1};
    text-decoration: none !important;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
   padding: 1rem;
  `};
`

const RightCard = styled(Card)`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  * {
    color: ${({ theme }) => theme.text1};
    text-decoration: none !important;
  }

  :before {
    content: '';
    position: absolute;
    width: 340%;
    height: 280%;
    top: -130%;
    left: -134%;
    z-index: -1;
    transform: rotate(-4deg);
  }
`

const SendReceiver = ({ client }) => {
  const { t } = useTranslation()
  const { address } = client

  return (
    <SimpleGrid>
      <CardSection>
        <ShadowCard>
          <LeftCard>
            <PageTitle>{t(`Receive Tokens`)}</PageTitle>

            <div
              style={{
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
              }}
            >
              <QRCodeWrapper>
                <QRCode style={{ width: 200, height: 200 }} value={address} />
              </QRCodeWrapper>

              <Address
                label={t(`Deposit in this address only ERC20 tokens:`)}
                address={address}
              ></Address>

              <CopyText toCopy={address}>
                <span style={{ marginLeft: '4px' }}>{t(`Copy`)}</span>
              </CopyText>
            </div>
          </LeftCard>
        </ShadowCard>

        <ShadowCard>
          <RightCard>
            <PageTitle>{t(`Send Tokens`)}</PageTitle>
            <Send />
          </RightCard>
        </ShadowCard>
      </CardSection>
    </SimpleGrid>
  )
}

SendReceiver.propTypes = {
  client: PropTypes.object.isRequired,
}

const state = ({ client }) => ({ client })
export default connect(state)(SendReceiver)
