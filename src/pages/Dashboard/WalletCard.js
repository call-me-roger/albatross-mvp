import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Flex, Box } from 'rebass/styled-components'
import styled from 'styled-components/macro'
import { useTranslation } from 'react-i18next'
import { TYPE } from 'theme'
import { SimpleGrid } from 'pages/Template/styles'
import Address from 'components/Address'
import History from 'components/History'
import Card, { ShadowCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import PageTitle from 'components/Titles/Page'
import TokensList from 'components/TokensList'
import { ButtonGray } from 'components/Button'

const CardSection = styled(AutoColumn)`
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
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

const WalletCard = ({ client }) => {
  const { t } = useTranslation()

  const { address } = client

  const history = useHistory()

  function handleCallback() {
    history.push('/tokens')
  }

  return (
    <CardSection>
      <ShadowCard>
        <LeftCard>
          <PageTitle style={{ alignSelf: 'flex-start' }}>
            {t(`Wallet`)}
          </PageTitle>

          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <TYPE.small mb="-10px">{t('You public wallet address')}</TYPE.small>

            <Address
              label={t(`Deposit in this address only ERC20 tokens:`)}
              address={address}
            />
          </Flex>

          <Box mb="12px">
            <TokensList />
            <ButtonGray onClick={handleCallback}>Show all</ButtonGray>
          </Box>
        </LeftCard>
      </ShadowCard>

      <ShadowCard>
        <RightCard>
          <SimpleGrid>
            <PageTitle style={{ alignSelf: 'flex-start' }}>
              {t(`Recent Activities`)}
            </PageTitle>

            <History limit={5} seeMore />
          </SimpleGrid>
        </RightCard>
      </ShadowCard>
    </CardSection>
  )
}

const state = ({ client }) => ({ client })
export default connect(state, null)(WalletCard)
