import { createState, useState } from '@hookstate/core'

const marketplaceState = createState({
  isLoading: false,
  neverLoaded: true,
  claimNFTBalance: 0,
  upgradeBalance: 0,
  energyBalance: 0,
  repairBalance: 0,
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
    setBalance(type, value) {
      return state[type].set(value)
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
