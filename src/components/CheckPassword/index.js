import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { WalletHelpers } from 'doric-core/helpers'
import { ButtonLight } from 'components/Button'
import { FormInputRow, SimpleInput } from 'components/Forms/inputs'
import Card from 'components/Card'
import { TYPE } from '../../theme'
import ExclamationIcon from 'components/SVG/ExclamationIcon'
import styled from 'styled-components'
import SimpleLoader from 'components/SimpleLoader'
import PageTitle from 'components/Titles/Page'
import useLoading from 'hooks/useLoading'

const BoxMessage = styled(Card)`
  display: ${({ hasError }) => (hasError ? 'auto' : 'none')};
`

export default function CheckPassword({ callback, confirmText }) {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [passwordHasError, setPasswordHasError] = useState(false)
  const { isLoading, startLoading, stopLoading, suspense } = useLoading()

  function handleEnter({ keyCode }) {
    if (keyCode === 13) callback(password)
  }

  function handleOnClick() {
    callback({
      password,
      onError: setPasswordHasError,
      startLoading,
      stopLoading,
    })

    setTimeout(() => {
      setPasswordHasError(false)
    }, 4000)
  }

  const canLogin =
    WalletHelpers.is_valid_password_length(password) && !isLoading

  return (
    <Card style={{ padding: `10px` }}>
      <PageTitle>{t('Confirm your password')}</PageTitle>
      <FormInputRow>
        <SimpleInput
          onKeyDown={handleEnter}
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
        />
      </FormInputRow>

      <BoxMessage padding="0" my="3" hasError={passwordHasError}>
        <TYPE.label>
          <ExclamationIcon />
          {` ${t(`Invalid password`)}`}
        </TYPE.label>
      </BoxMessage>

      <ButtonLight onClick={handleOnClick} disabled={!canLogin}>
        {suspense(confirmText, <SimpleLoader />)}
      </ButtonLight>
    </Card>
  )
}
