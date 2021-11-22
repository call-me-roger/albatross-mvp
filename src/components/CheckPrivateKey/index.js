import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonLight } from 'components/Button'
import { InputRow, SimpleInput } from 'components/Forms/inputs'
import Card from 'components/Card'
import { TYPE } from '../../theme'
import SimpleLoader from 'components/SimpleLoader'
import useLoading from 'hooks/useLoading'

export default function CheckPrivateKey({ callback, confirmText }) {
  const { t } = useTranslation()
  const [privateKey, setPrivateKey] = useState('')
  const { isLoading, startLoading, stopLoading, suspense } = useLoading()

  function onError(err) {
    console.log({ err })
  }

  function handleOnClick() {
    callback({
      privateKey,
      startLoading,
      stopLoading,
      onError,
    })
  }

  function handleEnter({ keyCode }) {
    if (keyCode === 13) handleOnClick()
  }

  const disableSubmit = !privateKey || isLoading || true

  return (
    <Card padding="10px">
      <TYPE.main pb="15px">Restore by private key</TYPE.main>
      <TYPE.darkGray pb="15px">Coming soon...</TYPE.darkGray>

      <InputRow>
        <SimpleInput
          onKeyDown={handleEnter}
          onChange={e => setPrivateKey(e.target.value)}
          value={privateKey}
          type="password"
          rows="20"
          placeholder={t(`Private Key`)}
        />
      </InputRow>

      <ButtonLight onClick={handleOnClick} disabled={disableSubmit}>
        {suspense(confirmText, <SimpleLoader />)}
      </ButtonLight>
    </Card>
  )
}
