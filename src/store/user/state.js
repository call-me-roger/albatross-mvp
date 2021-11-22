import { createState, useState } from '@hookstate/core'

const currentTimestamp = () => new Date().getTime()

const userState = createState({
  userDarkMode: false,
  timestamp: currentTimestamp()
})

export function useUserState() {
  const state = useState(userState)

  return {
    get isDarkMode() {
      return state.userDarkMode.get()
    },
    toggleDarkMode() {
      state.userDarkMode.set(isDarkMode => !isDarkMode)
    }
  }
}
