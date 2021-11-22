import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { WalletHelpers } from 'doric-core/helpers'
import { ButtonLight } from 'components/Button'
import { FormInputRow, SimpleInput } from 'components/Forms/inputs'
import { ResizingTextArea } from 'components/TextInput'
import Card from 'components/Card'
import ExclamationIcon from 'components/SVG/ExclamationIcon'
import { TYPE } from '../../theme'
import SimpleLoader from 'components/SimpleLoader'
import useLoading from 'hooks/useLoading'

const BoxMessage = styled(Card)`
  display: ${({ hasError }) => (hasError ? 'auto' : 'none')};
`

export default function CheckSeedWords({ callback, confirmText }) {
  const { t } = useTranslation()
  const [words, setWords] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [wordsHaveError, setWordsHaveError] = useState('')
  const { isLoading, startLoading, stopLoading, suspense } = useLoading()

  function handleEnter({ keyCode }) {
    if (keyCode === 13) callback(words)
  }

  function handleOnClick() {
    if (password !== confirmPassword)
      return handleSetError(t(`Password doesnt match`))

    callback({
      password,
      words,
      startLoading,
      stopLoading,
      onError: setWordsHaveError,
    })
  }

  function handleSetError(messageError) {
    setWordsHaveError(messageError)

    setTimeout(() => {
      setWordsHaveError('')
    }, 4000)
  }

  const cantSubmit =
    !WalletHelpers.is_valid_password_length(password) ||
    !WalletHelpers.is_valid_password_length(confirmPassword) ||
    words.split(' ').length !== 12 ||
    isLoading

  return (
    <Card padding="10px">
      <TYPE.main pb="15px">Check your credentials</TYPE.main>

      <FormInputRow>
        <ResizingTextArea
          value={words}
          onUserInput={setWords}
          placeholder={t('Words')}
        />
      </FormInputRow>

      <FormInputRow>
        <SimpleInput
          onKeyDown={handleEnter}
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          rows="20"
          placeholder={t(`New password`)}
        />
      </FormInputRow>

      <FormInputRow>
        <SimpleInput
          onKeyDown={handleEnter}
          onChange={e => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          placeholder="Confirm password"
        />
      </FormInputRow>

      <BoxMessage padding="0" my="3" hasError={wordsHaveError}>
        <TYPE.label>
          <ExclamationIcon />
          {` ${t(wordsHaveError)}`}
        </TYPE.label>
      </BoxMessage>

      <ButtonLight onClick={handleOnClick} disabled={cantSubmit}>
        {suspense(confirmText, <SimpleLoader />)}
      </ButtonLight>
    </Card>
  )
}
