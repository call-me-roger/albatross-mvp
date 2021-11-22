import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Text, Flex, Box } from 'rebass'
import { clientSyncRefresh } from 'doric-core/actions/main'
import { set_transaction, reset_transaction } from 'doric-core/actions/wallet'
import { EthersHelpers } from 'doric-core/helpers'
import { useTranslation } from 'react-i18next'
import { useApplicationState } from 'store/application/state'
import { CONFIRM_TRANSACTION } from 'store/application/types'
import { ButtonPrimary } from 'components/Button'
import { FormInputRow, SimpleInput } from 'components/Forms/inputs'
import ConfirmSend from 'components/ConfirmSend'
import { CurrencyListInput } from 'components/CurrencyInputPanel'
import { MaxButton, TransactionForm } from './styles'
import { getDialogByResponse } from './utils'

const SendTransaction = ({
  transaction,
  set_transaction,
  reset_transaction,
  clientSyncRefresh,
  client,
}) => {
  const { t } = useTranslation()

  const { tokens, balance, address } = client

  const { openPopup, closePopup } = useApplicationState()
  const [touched, setTouched] = useState({})

  const nativeCoin = { name: 'Doric', symbol: 'DRC', address: 'DRC', balance }
  const [currency, setCurrency] = useState(nativeCoin)

  const displayTokens = [nativeCoin, ...tokens]

  useEffect(() => {
    if (currency.symbol === 'DRC') setCurrency(nativeCoin)
  }, [balance])

  function closeTransactionForm() {
    closePopup(CONFIRM_TRANSACTION)
  }

  function resetTransaction() {
    reset_transaction()
    setTouched({})
  }

  function handleReponse(message, onTryAgain, params) {
    const { display } = getDialogByResponse(message, {
      onClose: () => closePopup('TRANSACTION_EVENTS'),
      onTryAgain: () => {
        closePopup('TRANSACTION_EVENTS')
        onTryAgain()
      },
      params,
    })

    if (display)
      openPopup('TRANSACTION_EVENTS', () => {
        return display
      })

    clientSyncRefresh({ address })
    closeTransactionForm()
  }

  function openTransactionConfirm() {
    openPopup(CONFIRM_TRANSACTION, () => (
      <ConfirmSend
        currency={currency}
        onConfirm={(message, params) => {
          resetTransaction()
          handleReponse(message, openTransactionConfirm, params)
        }}
        onFail={(message, params) =>
          handleReponse(message, openTransactionConfirm, params)
        }
        onEvent={message => handleReponse(message, openTransactionConfirm)}
        onCancel={closeTransactionForm}
      />
    ))
  }

  function doChange(key, value) {
    if (!touched[key]) setTouched({ ...touched, [key]: true })
    set_transaction({ key, value })
  }

  const invalidGasPrice = !EthersHelpers.is_valid_gas_price(transaction.gas)
  const invalidAddress = !EthersHelpers.is_address_valid(transaction.to)
  const noBalanceEnough = !EthersHelpers.enough_found(
    transaction.amount,
    currency.balance,
  )

  const blockTransaction = invalidGasPrice || invalidAddress || noBalanceEnough

  function handlerSelectedCurrency(currency) {
    setCurrency(currency)
  }

  return (
    <TransactionForm>
      <CurrencyListInput
        currency={currency}
        tokensList={displayTokens}
        onSelectCurrency={handlerSelectedCurrency}
        value={transaction.amount}
        onUserInput={newValue => doChange('amount', newValue)}
        error={touched['amount'] && noBalanceEnough}
        success={touched['amount'] && !noBalanceEnough}
        tabIndex="1"
      />

      <Flex
        justifyContent="space-between"
        alignItems="center"
        marginTop="-15px"
      >
        <Box>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 'bold',
            }}
          >
            {currency.balance} {currency.symbol}
          </div>
        </Box>

        <Box>
          <MaxButton onClick={() => doChange('amount', currency.balance)}>
            MAX
          </MaxButton>
        </Box>
      </Flex>

      <div
        style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
      ></div>

      <FormInputRow
        error={touched['to'] && invalidAddress}
        success={!invalidAddress}
      >
        <div style={{ width: '120px', padding: 0 }}>Address</div>
        <SimpleInput
          value={transaction.to}
          onChange={e => doChange('to', e.target.value)}
          fontSize="11px"
          tabIndex="2"
          style={{ textAlign: 'right' }}
        />
      </FormInputRow>

      <div style={{ width: '160px', marginBottom: '15px' }}>
        <FormInputRow error={invalidGasPrice}>
          <div style={{ width: '130px', padding: 0 }}>GAS Fee</div>
          <SimpleInput
            style={{ textAlign: 'right' }}
            value={transaction.gas}
            onChange={e => doChange('gas', e.target.value)}
            tabIndex="3"
          />
        </FormInputRow>
      </div>

      <ButtonPrimary
        onClick={openTransactionConfirm}
        width="auto"
        padding="10px"
        disabled={blockTransaction}
        tabIndex="4"
      >
        {t('SEND DRC')}
      </ButtonPrimary>
    </TransactionForm>
  )
}

SendTransaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
}

const state = ({ transaction, client }) => ({ transaction, client })
export default connect(state, {
  set_transaction,
  reset_transaction,
  clientSyncRefresh,
})(SendTransaction)
