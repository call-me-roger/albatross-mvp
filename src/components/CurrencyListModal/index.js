import React from 'react'
import { useTranslation } from 'react-i18next'
import Card from 'components/Card'
import { TYPE } from '../../theme'
import styled from 'styled-components'
import { ColumnCenter } from 'components/Column'
import CurrencyIcon from 'components/CurrencyIcon'

const TokenCard = styled(ColumnCenter)`
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  gap: 20px;

  &:hover {
    background-color: ${({ theme }) => theme.bg3};
    cursor: pointer;
  }

  &:last-child {
    border-bottom: 0px;
  }
`

const IconTokenCard = styled('div')`
  display: flex;
  align-items: center;
`

const DivisionOfTitle = styled('div')`
  border-bottom: 1px solid ${({ theme }) => theme.bg3};
  margin: 10px 0;
`

const BalanceTokenCard = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const CurrencyListModal = ({ onSelectToken, tokens }) => {
  const { t } = useTranslation()

  return (
    <Card padding={10}>
      <TYPE.main>{t('Select a token')}</TYPE.main>

      <DivisionOfTitle />

      {tokens?.map(item => (
        <TokenCard key={item.symbol} onClick={() => onSelectToken(item)}>
          <IconTokenCard>
            <CurrencyIcon
              style={{ margin: '0px 20px 0px 0px' }}
              symbol={item.symbol}
            />

            <TYPE.main style={{ fontSize: 20 }}>{item.name}</TYPE.main>
          </IconTokenCard>

          <BalanceTokenCard>
            <TYPE.small fontWeight={300}>{item.symbol}</TYPE.small>
          </BalanceTokenCard>
        </TokenCard>
      ))}
    </Card>
  )
}

export default CurrencyListModal
