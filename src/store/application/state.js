import { createState, useState } from '@hookstate/core'
import { close, open } from './actions'

const applicationState = createState({
  popupList: [],
  openModal: null,
})

export function useApplicationState() {
  const state = useState(applicationState)

  return {
    get popupList() {
      return state.popupList.get()
    },
    closePopup(slug) {
      close(state, { slug })
    },
    openPopup(slug, render, params = {}) {
      open(state, { slug, render, params })
    },
  }
}
