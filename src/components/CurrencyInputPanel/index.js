import React from 'react'
import { useApplicationState } from 'store/application/state'
import { CURRENCY_LIST_DETAILS } from 'store/application/types'
import { ArrowDown } from 'react-feather'
import styled from 'styled-components/macro'
import { Input as NumericalInput } from '../NumericalInput'
import { FormInputRow } from 'components/Forms/inputs'
import { ButtonOutlined } from 'components/Button'
import CurrencyListModal from 'components/CurrencyListModal'
import SimpleLoader from 'components/SimpleLoader'
import { theme } from 'theme'
import { useLocalState } from 'store/local/state'

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export function CurrencyInputPanel({
  value,
  currency = 'DRC',
  onUserInput,
  error,
  success,
  ...props
}) {
  return (
    <FormInputRow error={error} success={success}>
      <div style={{ width: '120px', padding: 0 }}>
        <Aligner>{currency}</Aligner>
      </div>
      <NumericalInput
        style={{ textAlign: 'right' }}
        className="token-amount-input"
        value={value}
        onUserInput={onUserInput}
        {...props}
      />
    </FormInputRow>
  )
}

export function CurrencyListInput({
  value,
  onSelectCurrency,
  currency,
  tokensList,
  onUserInput,
  error,
  success,
  ...props
}) {
  const { isDarkMode } = useLocalState()

  const { text2 } = theme(isDarkMode)

  const { openPopup, closePopup } = useApplicationState()

  function handlerSelectToken(token) {
    onSelectCurrency(token)
    closePopup(CURRENCY_LIST_DETAILS)
  }

  function handlerOpenModal() {
    openPopup(CURRENCY_LIST_DETAILS, () => (
      <CurrencyListModal
        onSelectToken={handlerSelectToken}
        tokens={tokensList}
      />
    ))
  }

  function handlerLoadTokens() {
    if (tokensList.length <= 1)
      return (
        <div style={{ paddingLeft: 10 }}>
          <SimpleLoader color={text2} />
        </div>
      )

    return (
      <ButtonOutlined onClick={handlerOpenModal}>
        {currency.symbol} <ArrowDown style={{ marginLeft: 6 }} size={14} />
      </ButtonOutlined>
    )
  }

  return (
    <FormInputRow error={error} success={success} style={{ padding: '5px' }}>
      <div style={{ width: '80px', padding: 0 }}>{handlerLoadTokens()}</div>

      <NumericalInput
        style={{ textAlign: 'right' }}
        className="token-amount-input"
        value={value}
        onUserInput={onUserInput}
        {...props}
      />
    </FormInputRow>
  )
}
