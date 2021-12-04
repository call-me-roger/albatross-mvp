import { createState, useState } from '@hookstate/core'

const marketplaceState = createState({
  isLoading: false,
  neverLoaded: true,
  claimNFTBalance: 0,
  upgradeBalance: 0,
  energyBalance: 0,
  repairBalance: 0,
  showRoulette: false,
  readyToClose: false,
  selectedPrize: null,
})

export function useRouletteState() {
  const state = useState(marketplaceState)

  return {
    get listings() {
      return state.listings.get()
    },
    get isLoading() {
      return state.isLoading.get()
    },
    get neverLoaded() {
      return state.neverLoaded.get()
    },
    get claimNFTBalance() {
      return state.claimNFTBalance.get()
    },
    get upgradeBalance() {
      return state.upgradeBalance.get()
    },
    get energyBalance() {
      return state.energyBalance.get()
    },
    get repairBalance() {
      return state.repairBalance.get()
    },
    get selectedPrize() {
      return state.selectedPrize.get()
    },
    get showRoulette() {
      return state.showRoulette.get()
    },
    get readyToClose() {
      return state.readyToClose.get()
    },
    setBalance(type, value) {
      return state[type].set(value)
    },
    setPrize(_prizeId) {
      return state.selectedPrize.set(_prizeId)
    },
    toggleShowRoulette(bool) {
      return state.showRoulette.set(bool)
    },
    setReadyToClose(bool) {
      return state.readyToClose.set(bool)
    },
    closeRoulette() {
      if (state.readyToClose.get()) {
        state.showRoulette.set(false)
        state.selectedPrize.set(null)
      }
    },
    startLoading() {
      return state.isLoading.set(true)
    },
    stopLoading() {
      state.isLoading.set(false)
      if (state.neverLoaded.get()) state.neverLoaded.set(false)
    },
  }
}
