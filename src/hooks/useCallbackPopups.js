import { ButtonPrimary } from 'components/Button'
import SimpleLoader from 'components/SimpleLoader'
import React from 'react'
import { useApplicationState } from 'store/application/state'

const useCallbackPopups = () => {
  const { openPopup, closePopup } = useApplicationState()

  function waitingUser(TYPE) {
    openPopup(TYPE, () => (
      <div align="center">
        <h3>Waiting user to approve the transaction...</h3>
        <SimpleLoader />
      </div>
    ))
  }

  function onSendTx(TYPE) {
    openPopup(TYPE, () => (
      <div align="center">
        <h3>Transaction sent. </h3>
        <h4>Waiting block confirmations...</h4>
        <SimpleLoader />
      </div>
    ))
  }

  function successPopup(TYPE, text, callback) {
    if (typeof callback === 'function') callback()
    openPopup(TYPE, () => (
      <div align="center">
        {text}
        <ButtonPrimary onClick={() => closePopup(TYPE)}>
          Continue...
        </ButtonPrimary>
      </div>
    ))
  }

  function errorPopup(TYPE, title, err, callback) {
    openPopup(TYPE, () => (
      <div>
        <h3>{title}</h3>
        <pre>{err?.data?.message}</pre>
        <ButtonPrimary
          onClick={() => {
            if (typeof callback === 'function') callback()
            closePopup(TYPE)
          }}
          style={{ width: '150px' }}
        >
          Reload
        </ButtonPrimary>
      </div>
    ))
  }

  return { waitingUser, onSendTx, successPopup, errorPopup }
}

export default useCallbackPopups
