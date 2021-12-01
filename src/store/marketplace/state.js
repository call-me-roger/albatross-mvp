import { createState, useState } from '@hookstate/core'

const marketplaceState = createState({
  listings: [],
  isLoading: false,
  neverLoaded: true,
  balance: 0,
})

export function useMarketplaceState() {
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
    get balance() {
      return state.balance.get()
    },
    setListings(newListings) {
      return state.listings.set(newListings)
    },
    startLoading() {
      state.isLoading.set(true)
    },
    stopLoading() {
      state.isLoading.set(false)
      if (state.neverLoaded.get()) state.neverLoaded.set(false)
    },
    setBalance(newBalance) {
      return state.balance.set(newBalance)
    },
  }
}
