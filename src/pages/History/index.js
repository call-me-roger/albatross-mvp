import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { AutoColumn } from 'components/Column'
import Card, { ShadowCard } from 'components/Card'
import PageTitle from 'components/Titles/Page'
import { History } from '../../components'
import { SimpleGrid } from 'pages/Template/styles'

const CardSection = styled(AutoColumn)`
  grid-template-columns: 1fr;
  gap: 8px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: auto;
    grid-template-rows: auto;
  `};
`

const HistoryPage = () => {
  const { t } = useTranslation()

  return (
    <SimpleGrid>
      <CardSection>
        <ShadowCard>
          <Card>
            <PageTitle>{t(`Recent Activities`)}</PageTitle>
            <History />
            {/* <div style={{ textAlign: 'center', padding: '10px' }}>{t(`Show all`)}</div> */}
          </Card>
        </ShadowCard>
      </CardSection>
    </SimpleGrid>
  )
}

export default HistoryPage
