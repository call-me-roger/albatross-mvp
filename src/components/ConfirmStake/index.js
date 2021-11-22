import React, { useState } from 'react'
import { Box } from './styles'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { sendStakeTransaction } from 'doric-core/actions/staking'
import { ButtonOutlined, ButtonPrimary } from 'components/Button'
import { FormInputRow, SimpleInput } from 'components/Forms/inputs'

const ConfirmStake = ({
  staking,
  sendStakeTransaction,
  onConfirm,
  onCancel,
  onFail,
  onEvent,
}) => {
  const { t } = useTranslation()
  const [form, setForm] = useState({ password: '' })

  const { transaction } = staking

  const change = (key, value) => {
    setForm({ ...form, [key]: value })
  }

  return (
    <Box>
      <div className="header-row">
        <div style={{ width: '80%', margin: 'auto', padding: '1rem 0px' }}>
          {t(`Confirm your staking`)}
        </div>
      </div>
      <div className="row-container">
        <div className="row1">
          <span className="a">{t(`Stake`)}</span>
          <span className="b">{transaction.name}</span>

          <span className="c">{t(`Amount`)}</span>
          <span className="d">
            {transaction.amount} {transaction.symbol}
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
            sendStakeTransaction({
              password: form.password,
              transaction,
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

const state = ({ staking }) => ({ staking })
export default connect(state, { sendStakeTransaction })(ConfirmStake)
