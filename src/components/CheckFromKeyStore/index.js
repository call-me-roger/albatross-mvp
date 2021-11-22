import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonLight } from 'components/Button'
import { InputRow, SimpleInput } from 'components/Forms/inputs'
import Card from 'components/Card'
import { TYPE } from '../../theme'
import ExclamationIcon from 'components/SVG/ExclamationIcon'
import styled from 'styled-components'
import { WalletHelpers } from 'doric-core/helpers'
import FileUploaderInput from 'components/FileUploaderInput'
import SimpleLoader from 'components/SimpleLoader'
import useLoading from 'hooks/useLoading'

const BoxMessage = styled(Card)`
  display: ${({ hasError }) => (hasError ? 'auto' : 'none')};
`

export default function CheckPrivateKey({ callback, confirmText }) {
  const { t } = useTranslation()
  const [selectedFile, setSelectedFile] = useState(null)
  const [keyStore, setKeyStore] = useState(null)
  const [password, setPassword] = useState('')
  const [wordsHaveError, setWordsHaveError] = useState('')
  const { isLoading, startLoading, stopLoading, suspense } = useLoading()

  function handleEnter({ keyCode }) {
    if (keyCode === 13) callback(selectedFile)
  }

  function handleOnChangeFile(e) {
    const fileReader = new FileReader()
    fileReader.readAsText(e.target.files[0], 'UTF-8')
    fileReader.onload = e => {
      setKeyStore(e.target.result)
    }

    setSelectedFile(e.target.files[0].name)
  }

  function handleOnClick() {
    if (!selectedFile || !password) return

    callback({
      password,
      keyStore,
      startLoading,
      stopLoading,
      onError: setWordsHaveError,
    })
  }

  const cantLogin =
    !WalletHelpers.is_valid_password_length(password) || isLoading

  return (
    <Card padding="10px">
      <TYPE.main pb="15px">Check your credentials</TYPE.main>

      <FileUploaderInput
        handleFile={handleOnChangeFile}
        selectedFile={selectedFile}
      />

      <InputRow>
        <SimpleInput
          onKeyDown={handleEnter}
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          rows="20"
          placeholder={t(`Password`)}
        />
      </InputRow>

      <BoxMessage padding="0" my="3" hasError={wordsHaveError}>
        <TYPE.label>
          <ExclamationIcon />
          {` ${t(wordsHaveError)}`}
        </TYPE.label>
      </BoxMessage>

      <ButtonLight onClick={handleOnClick} disabled={cantLogin}>
        {suspense(confirmText, <SimpleLoader />)}
      </ButtonLight>
    </Card>
  )
}
