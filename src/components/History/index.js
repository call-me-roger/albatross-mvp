import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ButtonGray } from 'components/Button'
import { SimpleGrid } from 'pages/Template/styles'
import Transaction from '../Transaction'
import useAddressTransactions from 'hooks/useAddressTransactions'

const History = ({ limit, seeMore, seeMoreCallback, simpleLayout }) => {
  const { transactions } = useAddressTransactions({})

  const { t } = useTranslation()
  const history = useHistory()

  function handleCallback() {
    history.push('/history')
    if (typeof seeMoreCallback === 'function') seeMoreCallback()
  }

  const haveTransactions = transactions?.length > 0

  return (
    <SimpleGrid>
      {transactions?.map((transaction, index) => {
        if (index + 1 > limit) return null
        return (
          <Transaction
            key={transaction.hash}
            transaction={transaction}
            simpleLayout={simpleLayout}
          />
        )
      })}
      {!haveTransactions && (
        <p style={{ color: 'gray', fontWeight: 'bold', textAlign: 'center' }}>
          {t(`noTransaction`)}
        </p>
      )}
      {haveTransactions && seeMore && (
        <ButtonGray onClick={handleCallback}>Show all</ButtonGray>
      )}
    </SimpleGrid>
  )
}

History.propTypes = {
  transactions: PropTypes.array,
  seeMore: PropTypes.bool,
  simpleLayout: PropTypes.bool,
}

History.defaultProps = {
  transactions: [],
  seeMore: false,
  simpleLayout: false,
}

export default History
