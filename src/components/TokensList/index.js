import { connect } from 'react-redux'
import styled from 'styled-components'
import { TYPE } from 'theme'
import { Box } from 'rebass/styled-components'
import { ColumnCenter } from 'components/Column'
import React from 'react'
import CurrencyIcon from 'components/CurrencyIcon'

const TokenCard = styled(ColumnCenter)`
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.bg3};

  &:last-child {
    border-bottom: 0px;
  }
`

const IconTokenCard = styled('div')`
  display: flex;
  align-items: center;
`

const BalanceTokenCard = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const TokensList = ({ client }) => {
  const { tokens, balance } = client
  const displayTokens = [{ name: 'Doric', symbol: 'DRC', balance }, ...tokens]

  return (
    <Box mb="12px">
      {displayTokens?.map(item => (
        <TokenCard key={item.symbol}>
          <IconTokenCard>
            <CurrencyIcon symbol={item.symbol} />

            <TYPE.main style={{ fontSize: 20 }}>{item.name}</TYPE.main>
          </IconTokenCard>

          <BalanceTokenCard>
            <TYPE.black>{item.balance}</TYPE.black>

            <TYPE.small fontWeight={300}>{item.symbol}</TYPE.small>
          </BalanceTokenCard>
        </TokenCard>
      ))}
    </Box>
  )
}

const state = ({ client }) => ({ client })
export default connect(state, null)(TokensList)
