import { createState, useState } from '@hookstate/core'

const tournamentState = createState({
  rounds: [],
  currentRoundIndex: 0,
  isLoading: false,
  isBalanceLoading: false,
  neverLoaded: true,
  balance: 0,
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
    get isBalanceLoading() {
      return state.isBalanceLoading.get()
    },
    get neverLoaded() {
      return state.neverLoaded.get()
    },
    get balance() {
      return state.balance.get()
    },
    setRounds(newRounds) {
      return state.rounds.set(newRounds)
    },
    setCurrentRoundIndex(newIndex) {
      return state.currentRoundIndex.set(newIndex)
    },
    startLoading() {
      return state.isLoading.set(true)
    },
    stopLoading(arg) {
      state.isLoading.set(false)
      if (state.neverLoaded.get()) state.neverLoaded.set(false)
    },
    startBalanceLoading() {
      return state.isBalanceLoading.set(true)
    },
    stopBalanceLoading() {
      return state.isBalanceLoading.set(false)
    },
    setBalance(newBalance) {
      return state.balance.set(newBalance)
    },
  }
}
