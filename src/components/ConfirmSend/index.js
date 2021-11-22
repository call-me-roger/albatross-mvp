import React, { useState } from 'react'
import { Box } from './styles'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { sendSignedTransaction } from 'doric-core/actions/transaction'
import { ButtonOutlined, ButtonPrimary } from 'components/Button'
import { FormInputRow, SimpleInput } from 'components/Forms/inputs'

const ConfirmSend = ({
  transaction,
  currency,
  sendSignedTransaction,
  onConfirm,
  onCancel,
  onFail,
  onEvent,
}) => {
  const { t } = useTranslation()
  const [form, setForm] = useState({ password: '' })

  const change = (key, value) => {
    setForm({ ...form, [key]: value })
  }

  return (
    <Box>
      <div className="header-row">
        <div style={{ width: '80%', margin: 'auto', padding: '1rem 0px' }}>
          {t(`Confirm Your Transaction`)}
        </div>
      </div>
      <div className="row-container">
        <div className="row1">
          <span className="a">{t(`Send`)}</span>
          <span className="b">{currency.name}</span>

          <span className="c">{t(`Amount`)}</span>
          <span className="d">
            {transaction.amount} {currency.symbol}
          </span>
        </div>
        <div className="row2">
          <span>{t(`Send to`)}</span>
          <span
            style={{ fontSize: `80%`, fontWeight: `bold`, textAlign: 'center' }}
          >
            {transaction.to}
          </span>
        </div>
        <div className="row3">
          <span className="a">{t(`Gas used`)}</span>
          <span className="b">{transaction.gas}</span>

          <span className="c">{t(`Gas Limit`)}</span>
          <span className="d">21000</span>
        </div>
        <div className="row4">
          <FormInputRow>
            <SimpleInput
              value={form.password}
              onChange={e => change(`password`, e.target.value)}
              type="password"
              placeholder="Password"
            />
          </FormInputRow>
        </div>
      </div>
      <div style={{ padding: '1rem 0px' }}>
        <ButtonOutlined
          onClick={onCancel}
          width="auto"
          padding="10px"
          style={{ marginRight: '15px' }}
        >
          {t(`Cancel`)}
        </ButtonOutlined>
        <ButtonPrimary
          onClick={() =>
            sendSignedTransaction({
              password: form.password,
              transaction: {
                ...transaction,
                contractAddress: currency.address,
              },
              onSuccess: onConfirm,
              onFail,
              onEvent,
            })
          }
          width="auto"
          padding="10px"
        >
          {t('Confirm')}
        </ButtonPrimary>
      </div>
    </Box>
  )
}

const state = ({ transaction }) => ({ transaction })
export default connect(state, { sendSignedTransaction })(ConfirmSend)
