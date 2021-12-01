import { createState, useState } from '@hookstate/core'

const tournamentState = createState({
  rounds: [],
  currentRoundIndex: 0,
  isLoading: false,
  neverLoaded: true,
})

export function useTournamentState() {
  const state = useState(tournamentState)

  return {
    get rounds() {
      return state.rounds.get()
    },
    get isLoading() {
      return state.isLoading.get()
    },
    get neverLoaded() {
      return state.neverLoaded.get()
    },
    setRounds(newRounds) {
      return state.rounds.set(newRounds)
    },
    setCurrentRoundIndex(newIndex) {
      return state.currentRoundIndex.set(newIndex)
    },
    startLoading() {
      state.isLoading.set(true)
    },
    stopLoading() {
      state.isLoading.set(false)
      if (state.neverLoaded.get()) state.neverLoaded.set(false)
    },
  }
}
