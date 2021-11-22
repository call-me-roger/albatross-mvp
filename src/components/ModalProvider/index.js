import Modal from 'components/Modal'
import React from 'react'
import { useApplicationState } from 'store/application/state'

const ModalProvider = () => {
  const { popupList } = useApplicationState()
  return (
    <>
      {popupList.map(({ slug, render, onDismiss }) => {
        const children = render()
        return (
          <Modal key={slug} onDismiss={onDismiss} isOpen>
            {children}
          </Modal>
        )
      })}
    </>
  )
}

export default ModalProvider
