import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useTranslation, Trans } from 'react-i18next'
import { useApplicationState } from 'store/application/state'
import { parseENSAddress } from 'utils/parseENSAddress'
import DepositIcon from '../SVG/Deposit'
import WithdrawnIcon from '../SVG/Withdrawn'
import {
  TransactionDisplay,
  Date,
  ActionIcon,
  ActionDetails,
  ActionInfo,
  FiatValue,
  ArrowIcon,
} from './styles'
import TransactionDetails from './TransactionDetails'
import { TRANSACTION_DETAILS } from 'store/application/types'
import { HideSmall, TYPE } from '../../theme'

const Transaction = ({ transaction, address, simpleLayout }) => {
  const { t } = useTranslation()
  const { openPopup } = useApplicationState()

  const { timestamp, to } = transaction
  const toAddress = to?.toLowerCase()
  const ownUserAddress = toAddress === address.toLowerCase()

  function displayAmount() {
    if (transaction?.transaction_token) return transaction.value
    return transaction.value
  }

  const action = (
    <Trans i18nKey={`${ownUserAddress ? 'tokenReceived' : 'tokenSent'}`}>
      {{ token: 'DRC' }}
    </Trans>
  )

  const addressAction = t(ownUserAddress ? 'fromAddress' : 'toAddress', {
    address: parseENSAddress(toAddress),
  })

  const { hash } = transaction

  return (
    <TransactionDisplay
      simpleLayout={simpleLayout}
      onClick={() =>
        openPopup(TRANSACTION_DETAILS, () => (
          <TransactionDetails
            address={toAddress}
            hash={hash}
            action={action}
            addressAction={addressAction}
          />
        ))
      }
    >
      <Date simpleLayout={simpleLayout}>
        <span>{moment(timestamp).format('MMM')}</span>
        <span className="day">{moment(timestamp).format('D')}</span>
      </Date>

      <HideSmall>
        <ActionIcon simpleLayout={simpleLayout}>
          {ownUserAddress ? <DepositIcon /> : <WithdrawnIcon />}
        </ActionIcon>
      </HideSmall>

      <ActionDetails simpleLayout={simpleLayout}>
        <span className="token-detail">{action}</span>

        <span className="address">{addressAction}</span>
      </ActionDetails>

      <ActionInfo>
        <TYPE.subHeader style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
          {`${ownUserAddress ? '' : '-'}${displayAmount(
            transaction.value,
          )} DRC`}
          <FiatValue>$0.00</FiatValue>
        </TYPE.subHeader>

        <div style={{ padding: '0px 10px' }}>
          <ArrowIcon />
        </div>
      </ActionInfo>
    </TransactionDisplay>
  )
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  simpleLayout: PropTypes.bool,
}

Transaction.defaultProps = {
  simpleLayout: false,
}

export default Transaction
